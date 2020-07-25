public with sharing class TodoController {

    @AuraEnabled(Cacheable=true)
    public static List<Todo__c> findTodos(String searchKey) {
        String key = '%' + searchKey + '%';
        return [
                SELECT Id, Name, Description__c, Creation_date__c, Category__c, Priority__c, Is_done__c, Image__c, CreatedDate, 
                (SELECT Name, 	Description__c, Is_done__c FROM Subtodos__r)
                FROM Todo__c
                WHERE Name LIKE :key
                LIMIT 10
        ];
    }

    @AuraEnabled
    public static String statusToDone(String id){
        List<Todo__c> todos = [
                SELECT Id, Name, Description__c, Creation_date__c, Category__c, Priority__c, Is_done__c, Image__c, CreatedDate, 
                (SELECT Name, 	Description__c, Is_done__c FROM Subtodos__r)
                FROM Todo__c
                WHERE Id = :id
        ];
        if(todos.isEmpty()){
            return 'error';
        }
        try {
            
            Todo__c todo = todos.get(0);
            todo.Is_done__c = true;
            for(Subtodo__c subTodo: todo.Subtodos__r){
                subTodo.Is_done__c = true;
            }
            update todo;
            update todo.Subtodos__r;
        } catch (Exception e) {
            return e.getMessage();
        }
        return 'ok';
    }
}