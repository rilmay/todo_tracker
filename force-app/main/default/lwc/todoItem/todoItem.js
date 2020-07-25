import { LightningElement, wire, api} from 'lwc';
import statusToDone from '@salesforce/apex/TodoController.statusToDone';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class TodoItem extends LightningElement {
    @api todo;
    @wire(CurrentPageReference) 
    pageRef;

    get styling() {
        if(this.todo.Priority__c === 'Mid'){
            return 'slds-theme_warning';
        }else if(this.todo.Priority__c === 'High'){
            return 'slds-theme_error';
        }
        //return 'slds-theme_info';
        return '';
    }

    createSubtodo(){
        this.modalHeader = 'Create subtodo';
        const modal = this.template.querySelector('c-modal');
        modal.show();
    }

    changeStatus(){
        var idPer = this.todo.Id;
        statusToDone({id: idPer})
            .then(result => {
                if(result === 'ok'){
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Todo status changed',
                            variant: 'success'
                        })
                    );
                    fireEvent(this.pageRef,'refresh');
                }else {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error editing record',
                            message: result,
                            variant: 'error'
                        })
                    );
                }
            })
    }

    
    handleCloseModal() {
        const modal = this.template.querySelector('c-modal');
        modal.hide();
    }

    get date(){
        var regex = /.+(?=T)/g;
        return regex.exec('' + this.todo.CreatedDate)[0];
    }
}