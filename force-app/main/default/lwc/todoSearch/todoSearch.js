
import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class TodoSearch extends LightningElement {
    @wire(CurrentPageReference) pageRef;

    handleKeyChange(event) {
        fireEvent(this.pageRef, 'searchKeyChange', event.target.value);
    }
}
