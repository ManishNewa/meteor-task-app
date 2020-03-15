import { Meteor } from 'meteor/meteor';
import { Tasks } from '../imports/api/tasks.js'

Meteor.startup(() => {
  // Listing all the available tasks
  Tasks.find({})
});
