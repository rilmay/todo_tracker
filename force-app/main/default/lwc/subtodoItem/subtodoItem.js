import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
//import { refreshApex } from '@salesforce/apex';
import IS_DONE_FIELD from '@salesforce/schema/Subtodo__c.Is_done__c';
import ID_FIELD from '@salesforce/schema/Subtodo__c.Id';
import {deleteRecord} from 'lightning/uiRecordApi';
import {fireEvent} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';



export default class SubtodoItem extends LightningElement {
    @api
    subtodo;

    @api
    disabledcheck;

    @wire(CurrentPageReference) 
    pageRef;


    handleedit(event){
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.subtodo.Id;
        fields[IS_DONE_FIELD.fieldApiName] = event.target.checked;

        const recordInput = { fields };

        updateRecord(recordInput)
                .then(() => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Subtodo updated',
                            variant: 'success'
                        })
                    );
                    // Display fresh data in the form
                    //return refreshApex(this.subtodo);
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error editing record',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                });
    }

    deleteTodo(event) {
        const recordId = event.target.dataset.recordid;
        deleteRecord(recordId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Subtodo deleted',
                        variant: 'success'
                    })
                );
                return fireEvent(this.pageRef, 'refresh');
             })
    }

}