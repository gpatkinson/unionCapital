Meteor.subscribe('events');
Meteor.subscribe('transactions');
Meteor.subscribe('images');
Meteor.subscribe('userData');

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});
