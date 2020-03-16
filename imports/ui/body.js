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
    }

});

Template.registerHelper( 
    "formatDate",function(date){
        return moment(date).fromNow()
    }
)

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
        console.log(!this.checked)
        Tasks.update({ _id: (data._id) }, {$set:{"checked": !this.checked}})    
    },

    // Edit task
    'click .edit-task'(){
        var data = Tasks.findOne({ _id:{ $eq : this._id}}).text
        // Create node only if it doesnt exist
        if (!document.getElementById("update-node")){
            document.getElementById('container').insertAdjacentHTML('afterbegin', '<div id="update-node"><input type="text" id="edit-task" value="' + data + ' "><button class="update-task">Update</button></div>')
        }
    },

    // Updates task
    'click .update-task'(){
        console.log("updated")
        var text = document.getElementById('edit-task').value;
        console.log(text)
        if(text){
            var data = Tasks.findOne({ _id:{ $eq : this._id}})
            console.log(text)
            Tasks.update({ _id: (data._id) }, {$set:{"text": text}})  
            $("#update-node").remove()
        }

    },

    // Deleting a task
    'click .delete'() {
        Tasks.remove(this._id);
    },

});

