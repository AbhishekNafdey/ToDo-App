/**
 * Created by Abhishek on 3/15/14.
 *
 * This is the starting point for the app.
 * It checks if the app is ever run and saved some data in the browser before else creates fake data.
 * In real world , there will be some ajax request or data will be send in responce from the server side when page loads.
 *
 * This starts a by creating an instence of the ToDoController.js
 */

(function(){
    "use Strict"


    function ToDoBootStrap(){
        this.appName = "ToDoApp";
        this.popUpBoxID= "userform";
        this.addButtonId = "addButton";
        this.sortButtonId = "sortButton";
        this.listWraperId = "todolist";
        this.popUpOkId= "saveandclose";
        this.userNameFormField ="username";
        this.listNameFormField = "listname";
        this.addToListText = "addtolist";
        this.viewDone = "viewdone";
        this.undo= "undo";
        this.delete = "delete"
        this.init();
    }
    ToDoBootStrap.prototype.init = function(){
        var hasInitialized = ToDoUtil.getData(this.appName);
        if( (hasInitialized) === null){
            this.firstRun();
        }else{
            this.startApp();
        }
    }
    ToDoBootStrap.prototype.firstRun = function(){
        this.popUpUserForm();
    }
    ToDoBootStrap.prototype.popUpUserForm= function(){
        var popUpBox =  ToDoUtil.getObject(this.popUpBoxID);
        var  okButton = ToDoUtil.getObject(this.popUpOkId);
        ToDoUtil.bindEvents(okButton,"click",this.saveUser,this);
        ToDoUtil.show(popUpBox);
    }
    ToDoBootStrap.prototype.saveUser = function(){
        var saveData = {
            toDoAppUser : ToDoUtil.getObject(this.userNameFormField).value ,
            listName : ToDoUtil.getObject(this.listNameFormField).value,
            toDoList :["do something","do something more"],
            doneList : []
        }
        ToDoUtil.setData(this.appName,JSON.stringify(saveData));
        ToDoUtil.hide(ToDoUtil.getObject(this.popUpBoxID));
        this.startApp();
    }

    ToDoBootStrap.prototype.startApp = function(){
        this.toDoApp = new ToDoController(this.addButtonId,this.sortButtonId, this.listWraperId ,this.addToListText,this.viewDone);
    }

    window.ToDoBootStrap =ToDoBootStrap;

})()

window.onload=function(){
    var bootstrap = new ToDoBootStrap();
};