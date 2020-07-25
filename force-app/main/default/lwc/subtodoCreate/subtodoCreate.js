import {LightningElement, wire, api} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {CurrentPageReference} from 'lightning/navigation';
import {fireEvent} from 'c/pubsub';

export default class SubtodoCreate extends LightningElement {
    @wire(CurrentPageReference) pageRef;

    @api
    todoid;

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