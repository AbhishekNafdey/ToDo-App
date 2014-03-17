/**
 * Created by Abhishek on 3/15/14.
 *
 * This is the controller module for the app.
 *
 * Its responsible for handeling any events on UI,changing the model data when required.Storing the data to localstorage and in real world save it
 * to server side usng some ajax post call.
 * t dose not do any rendering work to the page.
 */
(function(){
    "use strict"


    function ToDoController(addButonID,sortButonID,listWrapperID ,addToListText ,viewDone){

        this.addButton = ToDoUtil.getObject(addButonID);
        this.sortButton = ToDoUtil.getObject(sortButonID);
        this.listWraper = ToDoUtil.getObject(listWrapperID);
        this.addToListText = ToDoUtil.getObject(addToListText);
        this.viewDoneButton =  ToDoUtil.getObject(viewDone);
        this.bindEvents();
        this.init();
    }

    ToDoController.prototype.init = function(){
        this.model = new ToDoModel();
        var jsonObj =  JSON.parse(ToDoUtil.getData("ToDoApp"));
        this.model.userName = jsonObj.toDoAppUser;
        this.model.listName =jsonObj.listName;
        this.model.toDoList =jsonObj.toDoList;
        this.model.doneList = jsonObj.doneList;
        this.view = new ToDoView(this.model,this.listWraper);
    }
    ToDoController.prototype.bindEvents = function(){
        ToDoUtil.bindEvents(this.addButton,"click",this.addHandler,this);
        ToDoUtil.bindEvents(this.sortButton,"click",this.sortHandler,this);
        ToDoUtil.bindEvents(this.addToListText,"keyup",this.keyUpHandler,this);
        ToDoUtil.bindEvents(this.viewDoneButton,"click",this.viewDoneHandler,this);
        ToDoUtil.bindEventByClassname("undo","click",this.undoHandler,this);
        ToDoUtil.bindEventByClassname("delete","click",this.deletehandler,this);
        ToDoUtil.bindEventByClassname("done","click",this.doneHandler,this);
        ToDoUtil.bindEventByClassname("moveup","click",this.moveUpHandler,this);
        ToDoUtil.bindEventByClassname("movedown","click",this.moveDownHandler,this);
    }
    ToDoController.prototype.undoHandler = function(e){
        var undoIndex =  e.target.id.split("-")[1];
        this.model.toDoList.push(this.model.doneList[undoIndex]);
        this.model.doneList.splice(undoIndex,1);
        this.view.remderDoneList();
        this.saveData();

    }
    ToDoController.prototype.deletehandler = function(e){
        var undoIndex =  e.target.id.split("-")[1];
        this.model.doneList.splice(undoIndex,1);
        this.view.remderDoneList();
        this.saveData();
    }

    ToDoController.prototype.viewDoneHandler = function(e){

        if(e.target.innerText == "View Done"){
            if(this.model.doneList === undefined ){ return}
            this.view.remderDoneList();
            e.target.innerText = "View ToDo";
        }else{
            if(this.model.toDoList === undefined ){ return}
            this.view.remderList();
            e.target.innerText = "View Done";
        }

    }

    ToDoController.prototype.keyUpHandler = function(e){
        if(e.keyCode == 13){
            this.addButton.click();
        }
    }

    ToDoController.prototype.addHandler = function(e){
        var text = this.addToListText.value;
        if(text === ""){
            alert("Please add task to add!")
        } else{
            this.model.toDoList.unshift(this.addToListText.value);
            this.view.remderList();
            this.saveData();
        }

    }

    ToDoController.prototype.moveUpHandler = function(e){
        var currIndex =  e.target.id.split("-")[1];
        if(currIndex == 0) return;
        this.swap(parseInt(currIndex,10) - 1, currIndex);
    }

    ToDoController.prototype.moveDownHandler = function(e){
        var currIndex =  e.target.id.split("-")[1];
        if(currIndex == this.model.toDoList.length-1) return;
        this.swap(parseInt(currIndex,10) + 1, currIndex);
    }

    ToDoController.prototype.swap = function(indexA,withIndexB){
       var temp =  this.model.toDoList[indexA],
        doneButtons =   ToDoUtil.getByClassname("done"),
        sortButtons =  ToDoUtil.getByClassname("sortbuttons");

        this.model.toDoList[indexA] = this.model.toDoList[withIndexB];
        this.model.toDoList[withIndexB] = temp;
        this.view.remderList();
        this.saveData();
        ToDoUtil.show(sortButtons);
        ToDoUtil.hide(doneButtons);
    }

    ToDoController.prototype.doneHandler = function(e){
       var removeIndex =  e.target.id.split("-")[1];
        this.model.doneList.unshift(this.model.toDoList[removeIndex]);
        this.model.toDoList.splice(removeIndex,1);
        this.view.remderList();
        this.saveData();

    }

    ToDoController.prototype.sortHandler = function(e){

      var doneButtons =   ToDoUtil.getByClassname("done"),
          sortButtons =  ToDoUtil.getByClassname("sortbuttons");
        if(e.target.innerText == "Rearrange"){
            ToDoUtil.show(sortButtons);
            ToDoUtil.hide(doneButtons);
            e.target.innerText = "Arranged!";
        }else{
            ToDoUtil.hide(sortButtons);
            ToDoUtil.show(doneButtons);
            e.target.innerText = "Rearrange";
        }


    }
    ToDoController.prototype.saveData = function(){
        var saveData = {
            toDoAppUser : this.model.userName ,
            listName : this.model.listName,
            toDoList : this.model.toDoList,
            doneList : this.model.doneList
        }
        ToDoUtil.setData("ToDoApp",JSON.stringify(saveData));

    }

    window.ToDoController = ToDoController;
})()