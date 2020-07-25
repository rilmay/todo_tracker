import { LightningElement, api } from 'lwc';

export default class TodoContainer extends LightningElement {
    @api
    modalHeader = '';

    createTodo(){
        this.modalHeader = 'Create todo';
        const modal = this.template.querySelector('c-modal');
        modal.show();
    }

    handleCloseModal(){
        const modal = this.template.querySelector('c-modal');
        modal.hide();
    }
}