import { LightningElement, track, api } from 'lwc';

//import {ShowToastEvent} from 'lightning/platformShowToastEvent';
//import saveFile from '@salesforce/apex/TagHelper.saveFile';
//import insertTags from '@salesforce/apex/TagHelper.insertTags';

export default class UploadTagFile extends LightningElement {

    /*
    @track data;
    @track fileName = '';
    @track UploadFile = 'Upload File';
    @track showLoadingSpinner = false;
    @track isTrue = false;
    selectedRecords;
    filesUploaded = [];
    file;
    fileContents;
    fileReader;
    content;
    MAX_FILE_SIZE = 1500000;

    get acceptedFormats() {
        return ['.csv'];
    }

// getting file 
handleFilesChange(event) {
    window.console.log('handleFilesChange called');
    if(event.target.files.length > 0) {
        this.filesUploaded = event.target.files;
        this.fileName = event.target.files[0].name;
    }
    window.console.log('handleFilesChange done');
}

handleSave() {
    if(this.filesUploaded.length > 0) {
        this.uploadHelper();
    }
    else {
        this.fileName = 'Please select file to upload!!';
    }
}

uploadHelper() {

    window.console.log('uploadHelper called');

    this.file = this.filesUploaded[0];
   if (this.file.size > this.MAX_FILE_SIZE) {
        window.console.log('File Size is to long');
        return ;
    }
    this.showLoadingSpinner = true;
    // create a FileReader object 
    this.fileReader= new FileReader();
    // set onload function of FileReader object  
    this.fileReader.onloadend = (() => {
        this.fileContents = this.fileReader.result;
        let base64 = 'base64,';
        this.content = this.fileContents.indexOf(base64) + base64.length;
        this.fileContents = this.fileContents.substring(this.content);
        
        //window.console.log('uploadHelper save TBD');
        // call the uploadProcess method 
        //this.saveToFile();
        this.insertTagRecords();
        //this.showLoadingSpinner = false;
    });

    this.fileReader.readAsDataURL(this.file);

    window.console.log('uploadHelper complete');
}    

// Calling apex class to insert the file
saveToFile() {
    saveFile({ idParent: 'a01R000000DvlsZIAR', strFileName: this.file.name, base64Data: encodeURIComponent(this.fileContents)})
    .then(result => {
        window.console.log('result ====> ' +result);

        this.fileName = this.fileName + ' - Uploaded Successfully';
        this.UploadFile = 'File Uploaded Successfully';
        this.isTrue = true;
        this.showLoadingSpinner = false;

        // Showing Success message after file insert
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success!!',
                message: this.file.name + ' - Uploaded Successfully!!!',
                variant: 'success',
            }),
        );

    })
    .catch(error => {
        // Showing errors if any while inserting the files
        this.showLoadingSpinner = false;
        window.console.log(error);
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error while uploading File',
                message: error.message,
                variant: 'error',
            }),
        );
    });
}

// Calling apex class to insert the firecordsle
insertTagRecords() {
    
    let recs = [];

    recs.push({
        Name: 'testing',
        tagitapp__Description__c: 'testing',
        tagitapp__Help_Text__c: 'help',
        tagitapp__Active__c: false, 
        tagitapp__Tag_Color__c: 'Green',
    });          
            
    insertTags({ tags: recs})
    .then(result => {
        window.console.log('insertTagRecords result ====> ' +result);

        this.isTrue = true;
        this.showLoadingSpinner = false;

        // Showing Success message after file insert
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success!!',
                message: 'Uploaded Successfully!!!',
                variant: 'success',
            }),
        );

    })
    .catch(error => {
        // Showing errors if any while inserting the files
        this.showLoadingSpinner = false;
        window.console.log(error);
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error while inserting tags',
                message: error.message,
                variant: 'error',
            }),
        );
    });
}
*/

}