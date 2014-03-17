/**
 * Created by Abhishek on 3/15/14.
 *
 * This is a custom utility module which holds comman functions like getting, setting local storage data,
 * Binding and triggering events.
 *
 * As jQuery or other framework were not alloed, this was created to help to jobs which are frequently required in the app everywhere.
 */

(function(){
    "use strict"

    function ToDoUtil(){
        this.hasStorage = this.checkStorage();
    }
    ToDoUtil.prototype.getObject = function(ID){

        if (typeof (ID) === "string"){
            var obj =  document.getElementById(ID);
            if(obj === null){
                return false
            }else{
                return obj;
            }

        }else {
            return ID;
        }
    }
    ToDoUtil.prototype.hide = function(obj){
        if (typeof (obj) === "string"){
            return false;
        }
        if(obj.style){ obj.style.display = "none"; return}
        for(var i = 0 ; i < obj.length;  i ++){
            obj[i].style.display = "none";
        }
    }
    ToDoUtil.prototype.show = function(obj){
        if (typeof (obj) === "string"){
            return false;
        }
        if(obj.style){ obj.style.display = "block"; return}
        for(var i = 0 ; i < obj.length;  i ++){
            obj[i].style.display = "block";
        }
    }
    ToDoUtil.prototype.getByClassname = function( className,context){
        context = context || document;

        if (typeof (className) === "string"){
            var obj =  context.getElementsByClassName(className);
            if(obj === null){
                return false
            }else{
                return obj;
            }

        }else {
            return obj;
        }


    }
    ToDoUtil.prototype.getHtml = function(target){
        var obj = this.getObject(target);
        if(obj){
            return  obj.innerHTML;
        }else{
            return obj;
        }

    }
    ToDoUtil.prototype.setHtml = function(html,target){
        var obj = this.getObject(target);
        if(obj){
            obj.innerHTML = html;
        }else{
            return obj;
        }


    }
    ToDoUtil.prototype.bindEventByClassname = function(classname,eventName,callBack,context,arg){

        if (document.addEventListener){
            if(context){
                document.addEventListener (eventName,function(e){
                    if(e.target.className.indexOf(classname)> -1){
                        var parameter  = arg || [];
                        parameter.unshift(e);
                        callBack.apply(context,parameter);
                    }
                },false);
            }else{
                document.addEventListener (eventName,function(e){
                    if(e.target.className.indexOf(classname)> -1){
                        callBack();
                    }
                },false);
            }

        }else if (elem.attachEvent){
            if(context){
                elem.attachEvent ('on'+eventName,function(){
                    if(e.target.className.indexOf(classname)> -1){
                        var parameter  = arg || [];
                        parameter.unshift(e);
                        callBack.apply(context,parameter);
                    }
                });
            }else{
                elem.attachEvent ('on'+eventName,function(e){
                    if(e.target.className.indexOf(classname)> -1){
                        callBack();
                    }
                });
            }
        }
    }
    ToDoUtil.prototype.bindEvents= function(elem,eventName,callBack,context,arg){

        if (elem.addEventListener){
            if(context){
                document.addEventListener (eventName,function(e){
                    if(e.target == elem){
                        var parameter  = arg || [];
                        parameter.unshift(e);
                        callBack.apply(context,parameter);
                    }
                },false);
            }else{
                document.addEventListener (eventName,function(e){
                    if(e.target == elem){
                        callBack();
                    }
                },false);
            }

        }else if (elem.attachEvent){
            if(context){
                elem.attachEvent ('on'+eventName,function(){
                    if(e.target == elem){
                        var parameter  = arg || [];
                        parameter.unshift(e);
                        callBack.apply(context,parameter);
                    }
                });
            }else{
                elem.attachEvent ('on'+eventName,function(e){
                    if(e.target == elem){
                        callBack();
                    }
                });
            }

        }
    }
    ToDoUtil.prototype.checkStorage = function(){
        if(typeof(Storage)!=="undefined")
        {
            return true;
        }else{
            return false;
        }
    }

    ToDoUtil.prototype.setData = function(key, value){
        if(this.hasStorage){
            try{
                localStorage.setItem(key , value);
                return true;
            }catch(e){
                return false;
            }

        }
    }
    ToDoUtil.prototype.getData = function(key){
        if(this.hasStorage){
            try{

                return localStorage.getItem(key);
            }catch(e){
                return false;
            }
        }
    }

    window.ToDoUtil = new ToDoUtil;
})()
