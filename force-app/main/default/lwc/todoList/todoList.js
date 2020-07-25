import {api, LightningElement, wire} from 'lwc';
import findTodos from '@salesforce/apex/TodoController.findTodos';
import {CurrentPageReference} from 'lightning/navigation';
import {registerListener, unregisterAllListeners} from 'c/pubsub';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
// import {reduceErrors} from 'c/ldsUtils';
import {deleteRecord} from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';

export default class TodoList extends LightningElement {
    searchKey = '';

    @wire(CurrentPageReference) pageRef;
    @wire(findTodos, {searchKey: '$searchKey'})
    todos;

    @api modalHeader = '';

    //tododo = findTodos({searchKey: 'he'});

    @api editId;

    connectedCallback() {
        registerListener('searchKeyChange', this.handleSearchKeyChange, this);
        registerListener('refresh',this.handleRefresh, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleSearchKeyChange(searchKey) {
        this.searchKey = searchKey;
        refreshApex(this.todos);
    }

    handleRefresh(){
        refreshApex(this.todos);
    }

    deleteTodo(event) {
        const recordId = event.target.dataset.recordid;
        deleteRecord(recordId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Todo deleted',
                        variant: 'success'
                    })
                );
                return refreshApex(this.todos);
             })
    }

    editTodo(event) {
        this.modalHeader = 'Edit todo';
        this.editId = event.target.dataset.recordid;
        const modal = this.template.querySelector('c-modal');
        modal.show();
    }

    handleCloseModal() {
        const modal = this.template.querySelector('c-modal');
        modal.hide();
    }
}
