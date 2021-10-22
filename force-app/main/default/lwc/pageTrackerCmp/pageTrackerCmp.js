import { LightningElement } from 'lwc';
import getSomething from '@salesforce/apex/TagHelper.getSomething';

export default class PageTrackerCmp extends LightningElement {

    handleClick(event) {

        console.log("handleClick called");

        //event.preventDefault();

        getSomething({
            data: "FAIL"
        }).then((data) => {            
            console.log("getSomething msg=" + msg);
        });    
        /*
        getSomething({
            data: "FAIL"
        })
        .then((data) => {            
            console.log("getSomething msg=" + msg);
        })
        .catch((error) => {
            this.message = 'getSomething Error received: code' + error.errorCode + ', ' +
                'message ' + error.body.message;                
        });              */
    }
}