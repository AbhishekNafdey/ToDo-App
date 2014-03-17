/**
 * Created by Abhishek on 3/15/14.\
 *
 * This is the view module.
 * It only does the work of rendering the module data when ever model data is changed and rendering is triggered.
 */

(function(){
 "use strict"


    function ToDoView(model ,listWrapper){
        this.mode= model;
        this.toDoList = model.toDoList;
        this.doneList = model.doneList;
        this.list = listWrapper;
        this.init();
    }

    ToDoView.prototype.init = function(){
       ToDoUtil.setHtml(this.mode.listName,"displaylistname");
       this.listItems = this.remderList();


    }
    ToDoView.prototype.remderList = function(){
        if(this.toDoList === undefined ){ return}
    ToDoUtil.setHtml("",this.list);
      for(var i = 0 ; i < this.toDoList.length; i ++){
          var li = document.createElement("li");
          li.setAttribute("class","incomplete");
          li.innerHTML = "<span>"+ this.toDoList[i]+"</span>" +
              "<button class='done' id='done-"+i+"'>Done</button>" +
              "<button class='moveup sortbuttons' id='up-"+i+"'>Up</button>" +
              "<button class='movedown sortbuttons' id='down-"+i+"'>Down</button>";
          this.list.appendChild(li);
      }
    }
    ToDoView.prototype.remderDoneList = function(){

        ToDoUtil.setHtml("",this.list);
        for(var i = 0 ; i < this.doneList.length; i ++){
            var li = document.createElement("li");
            li.setAttribute("class","completed");
            li.innerHTML = "<span>"+ this   .doneList[i]+"</span>" +
                "<button class='undo' id='undo-"+i+"'>UnDo</button>" +
                "<button class='delete' id='delete-"+i+"'>Delete</button>";
            this.list.appendChild(li);
        }
    }

    window.ToDoView = ToDoView;

})()