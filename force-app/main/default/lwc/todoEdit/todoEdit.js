import {api, LightningElement} from 'lwc';
//import { fireEvent } from 'c/pubsub';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Todo__c.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/Todo__c.Description__c';
import STATUS_FIELD from '@salesforce/schema/Todo__c.Is_done__c';
import PRIORITY_FIELD from '@salesforce/schema/Todo__c.Priority__c';
import CATEGORY_FIELD from '@salesforce/schema/Todo__c.Category__c';

export default class TodoEdit extends LightningElement {

    @api editId;

    fields = [NAME_FIELD, DESCRIPTION_FIELD, STATUS_FIELD, PRIORITY_FIELD, CATEGORY_FIELD];

    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: "Todo have been edited",
            message: event.target.recordId,
            variant: "success"
        });
        this.dispatchEvent(evt);
        this.dispatchEvent(new CustomEvent('refresh'));
        //fireEvent(this.pageRef, 'refresh');
        
    }
}
