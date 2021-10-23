import { LightningElement } from 'lwc';
import throwCPULimit from '@salesforce/apex/TagHelper.ThrowCPULimit';
import throwSOQLLimit from '@salesforce/apex/TagHelper.ThrowSOQLLimit';

export default class PageBreakerCmp extends LightningElement {
  
    get theresult() {

      
      console.log('Maybe we throw an error');
      let result = 'fail';
      switch(Math.floor((Math.random() * 5) + 1)) {
        case 1:
          console.log('Thow CPU Limit Error');
          throwCPULimit();
          break;
        case 2:
          console.log('Throw SOQL Limit Error');
          throwSOQLLimit();
          break;
        default:
          console.log('Not Throwing an error');
          result = 'No Error';
      }
      return result;
    };    
    
}

