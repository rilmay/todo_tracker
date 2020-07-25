import {LightningElement, wire} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {CurrentPageReference} from 'lightning/navigation';
import {fireEvent} from 'c/pubsub';


export default class TodoCreate extends LightningElement {
    @wire(CurrentPageReference) pageRef;

    handleSuccess(event) {
        this.dispatchEvent(new CustomEvent('success'));

        const evt = new ShowToastEvent({
            title: "Todo created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);

        fireEvent(this.pageRef, 'refresh');
    }

}