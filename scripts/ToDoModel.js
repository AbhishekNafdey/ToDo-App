/**
 * Created by Abhishek on 3/15/14.\
 *
 * This is the model for the app.
 *
 * Its purpose is to just hold the data for the app .
 * It can be either populated via an ajax request or from server side itself like in a Node.js application.
 */


(function(){
    "use strict"

   function  ToDoModel(){
       this.toDoList = null;
       this.doneList = null;
       this.userName = "";
       this.listName = "";
       this.init();
   }

    ToDoModel.prototype.init = function(){

    }

    window.ToDoModel = ToDoModel;
})()