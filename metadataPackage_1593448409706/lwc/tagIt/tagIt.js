import { LightningElement, track, api, wire } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';

import getAccountTags from '@salesforce/apex/TagHelper.getAccountTags';
import getTags from '@salesforce/apex/TagHelper.getTags';
import createTagLink from '@salesforce/apex/TagHelper.CreateTagLink';
import getUserRecordAccess from '@salesforce/apex/TagHelper.getUserRecordAccess';
import softDeleteLink from '@salesforce/apex/TagHelper.SoftDeleteLink';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import colors_icon from '@salesforce/resourceUrl/colors';

import ID_FIELD from '@salesforce/schema/Object_Tag__c.Id';
import ISDELETED_FIELD from '@salesforce/schema/Object_Tag__c.IsDeleted__c';
import FORM_FACTOR from '@salesforce/client/formFactor';

export default class TagIt extends LightningElement {
    
    @api whichObject;
    @api recordId = '0012F00000detHPQAY';

    @track infoText;

    isMobile;

    ALL_LABEL = "Select Tag Category";

    @track selcat = this.ALL_LABEL;
    @track catOptions;

    userRecordAccess;
    @track parentEditAccess;
    @api showCategory = false;
    @track hideTags = true;

    @api label = '';
    @api name = '';
    @api value = '';
    @api required;
    @api placeholder = '';
    
    initialized = false;

    @track tags;        
    alltags;        

    @wire(getTags)
    wiredTags({ error, data }) {        

        console.log("All tags=" + JSON.stringify(data));
        
        if (data) {
            this.tags = data;            
            this.alltags = data;
            
            let catOptionsList = new Set();
            let tempCatOptionsList = [];

            //TBD
            this.showCategory = true;
            data.forEach(function (rec, index) {                
                catOptionsList.add(rec.tagitapp__Category__c);                
            });

            tempCatOptionsList.push({
                label: this.ALL_LABEL,
                value: this.ALL_LABEL,
            });
            catOptionsList.forEach(function (val, index) {    
                if(val != undefined && val.trim() != ''){
                    tempCatOptionsList.push({
                        label: val,
                        value: val,
                    });
                }
            });
            this.catOptions = tempCatOptionsList;
        
            console.log("catOptionsList=" + JSON.stringify(this.catOptions));

            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.tags = undefined;
        }
    }

    @track atags;
    @wire(getAccountTags, { recordId: '$recordId'})
    wiredAccountTags({ error, data }) {        
        console.log("getAccountTags, recordId=" + this.recordId);
        console.log("getAccountTags=" + JSON.stringify(data));

        if (data) {

            let updatedData = [];
            data.forEach(function (rec, index) {

                updatedData.push({
                    Id: rec.tagitapp__Tag__r.Id,
                    Name: rec.tagitapp__Tag__r.Name,
                    Description: rec.tagitapp__Tag__r.Description,
                    linkRecId: rec.Id, 
                    icon: colors_icon + '#' + rec.tagitapp__Tag__r.tagitapp__Tag_Color__c,
                });          
            });

            console.log("getAccountTags done");

            this.atags = updatedData;
            
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.atags = undefined;
        }
    }

    @wire(getUserRecordAccess, { recordId: '$recordId' })
    wiredUserRecordAccess({ error, data }) {
        if (data) {
            this.parentEditAccess = data.HasEditAccess;
            this.parentEditAccess = true; //TBD comment this
            console.log("this.parentEditAccess=" + this.parentEditAccess);
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.parentEditAccess = false;
        }
    }

    connectedCallback(){
        console.log("formFactor=" + FORM_FACTOR);        
        if(FORM_FACTOR == 'Small') this.isMobile = true;
    }

    renderedCallback() {
        
        if(this.parentEditAccess != undefined && this.parentEditAccess && !this.hideTags){
            let listId = this.template.querySelector('datalist').id;
            this.template.querySelector("input").setAttribute("list", listId);    
        } 

        if (this.initialized) {
            return;
        }
        this.initialized = true;

    }

    handleChange(event) {
        this.value = event.target.value;
        window.console.log("handleChange val=" + this.value);

        let tag = this.tags.filter(tag => tag.Name == this.value);
        if(tag.length < 1) {
            this.value = '';
            return;
        }

        let atag = this.atags.filter(tag => tag.Name == this.value);
        if(atag.length > 0) {
            this.value = '';
            return;
        }

        //let vLinkRecId = this.SaveTag(this.recordId, tag[0].Id);                    
        
        createTagLink({
            recordId: this.recordId,
            tagId: tag[0].Id
        })
        .then((data) => {
            
            console.log("Saved, data.Id=" + data);
            let vLinkRecId = data;

            let vTag = {
                Id: tag[0].Id,
                Name: tag[0].Name,
                Description: tag[0].Description,
                linkRecId: vLinkRecId,
                icon: colors_icon + '#' + tag[0].tagitapp__Tag_Color__c,
            };
    
            window.console.log("got tag id=" + tag[0].Id);
            window.console.log("vTag =" + JSON.stringify(vTag));
    
            this.value = '';
           
            this.atags.push(vTag);            
        })
        .catch((error) => {
            this.message = 'Error received: code' + error.errorCode + ', ' +
                'message ' + error.body.message;
        });        
    }
           
    handleRemoveOnly(event) {
        event.preventDefault();
        this.infoText = 'Remove button was clicked!' + event.target.dataset.id;
        window.console.log("Before deleting tag link, id=" + event.target.dataset.id);
        if(this.parentEditAccess){
            //this.deleteTagLink(event.target.dataset.id);
            this.softDeleteTagLink(event.target.dataset.id);            
            this.atags = this.atags.filter(atag => atag.linkRecId != event.target.dataset.id);
            window.console.log("After deleting tag link");
        }else{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Permission issue!',
                    message: 'Sorry you do not have permission to remove the tag!',
                    variant: 'error'
                })
            );            
        }

    }

    handleClick() {
        this.infoText = 'The pill was clicked!';
    }

    handleShowTagClick(event){
        this.hideTags = false;
    }

    handleCatChange(event){
        event.preventDefault();
        window.console.log("handleCatChange selcat=" + event.target.value);
        if(event.target.value === this.ALL_LABEL){
            this.tags = this.alltags;
            return;
        }
        this.tags = this.alltags.filter(atag => atag.tagitapp__Category__c === event.target.value);
    }   

    deleteTagLink(linkId) {
        deleteRecord(linkId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Tag removed',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error removing Tag',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }


    softDeleteTagLink(linkId) {
        
        softDeleteLink({
            recordId: linkId
        })
        .then((data) => {            
            console.log("softDeleteTagLink Id=" + data);
        })
        .catch((error) => {
            this.message = 'softDeleteTagLink Error received: code' + error.errorCode + ', ' +
                'message ' + error.body.message;
        });                
    }

    SaveTag(recId, tagId) {
        createTagLink({
            recordId: recId,
            tagId: tagId
        })
        .then((data) => {
            
            console.log("Saved, data.Id=" + data);
            return data;
        })
        .catch((error) => {
            
            this.message = 'Error received: code' + error.errorCode + ', ' +
                'message ' + error.body.message;
        });
    }

}
