import { Template } from 'meteor/templating';
 
import './body.html';
import { Tasks }  from '../api/tasks.js';
 
Template.body.helpers({
    tasks : function() {
        // console.log(Tasks.find({}))
        return Tasks.find({});
    }
    // Manually creating an array of tasks to display on the client ui
    // tasks: function(){
    //     return [
    //         { "text" : "Hello" },
    //         { "text" : "World" },
    //         { "text" : "!" }
    //     ];
    // }
});

Template.body.events({
    'click button#submit-task'(event) {
      // Prevent default browser form submit
      event.preventDefault();
   
      // Get value from form input element
      const task = $('.task').val();
   
      // Insert a task into the collection
      if(task){
        Tasks.insert({
            text: task,
            createdAt: new Date(), // current time
          });
      }else{
          alert('Enter a task value')
      }      
   
      // Clear form input
      $('.task').val('');
    },
});