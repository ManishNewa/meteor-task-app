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
      console.log("Clicked")
      // Prevent default browser form submit
      event.preventDefault();
   
      // Get value from form element
      const target = event.target;
      console.log(target)
      const text = target.text.value;
   
      // Insert a task into the collection
      Tasks.insert({
        text,
        createdAt: new Date(), // current time
      });
   
      // Clear form
      target.text.value = '';
    },
});