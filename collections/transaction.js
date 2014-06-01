Transactions = new Meteor.Collection('transactions', {
  schema: {
     userId: {
               type: String,
               label: 'User Identifier',
               optional: true
             },
     eventId: {
               type: String,
               label: 'ID of related Event'
               }
          }
});

Transactions.allow({
  insert: function(userId, transaction) {
            // FIXME this is a validation, this probably shouldn't be part of the authorization
            return Transactions.find({userId: transaction.userId, eventId: transaction.eventId}).count() === 0;
          },
  update: function() {
            return true;
          },
  remove: function() {
            return true;
          },
});
