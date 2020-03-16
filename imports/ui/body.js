import { Template } from 'meteor/templating';
 
import './body.html';
import { Tasks }  from '../api/tasks.js';
import './components/task.html'
import './components/modal.html'
// Moment for formatting date in human readable format
var moment = require('moment')
 
Template.body.helpers({
    tasks : function() {
        return Tasks.find({} , {sort: {createdAt : -1}});
    },
    checkedOrNot: function(checked){
        if(checked){
            return true
        }else{
            return false
        }
    },
    

});

Template.registerHelper( 
    "formatDate",function(date){
        return moment(date).fromNow()
    },
    
)

Template.task.helpers({
    isEdit:function(){
        return true;
    }
})

Template.body.events({
    // Adding tasks
    'click button#submit-task'(event) {
      // Prevent default browser form submit
      event.preventDefault();
   
      // Get value from form input element
      const task = $('.task').val();
   
      // Insert a task into the collection
      if(task){
        Tasks.insert({
            text: task,
            checked: false,
            status: "new",
            createdAt: new Date(), // current time
          });
      }else{
          alert('Enter a task value')
      }      
   
      // Clear form input
      $('.task').val('');
    },

    // Check Uncheck Tasks
    'click .check-task'(){
        var data = Tasks.findOne({ _id:{ $eq : this._id}})
        var status = data.checked ? "Pending" : "Completed";
        console.log(!this.checked)
        Tasks.update({ _id: (data._id) }, {$set:{"checked": !this.checked, "status" : status}})    
    },

    // Edit task
    'click .edit-task'(){

        // console.log(this,"this");
        // // var data = Tasks.findOne({ _id:{ $eq : this._id}}).text
        // // Create node only if it doesnt exist
        // if (!document.getElementById("update-node")){
        //     document.getElementById('title_col').insertAdjacentHTML('afterbegin', '<div id="update-node"><input type="text" id="edit-task" value="' + this.text + ' "><button class="update-task">Update</button></div>')
        // }
    },

    // Updates task
    'click .update-task'(event, instance){
        console.log(instance)
        var text = document.getElementById('edit-task').value;
        if(text){
            var data = Tasks.findOne({ _id:{ $eq : this._id}})
            Tasks.update({ _id: (data._id) }, {$set:{"text": text}})  
            $("#update-node").remove()
        }

    },

    // Deleting a task
    'click .delete'() {
        Tasks.remove(this._id);
    },

});

