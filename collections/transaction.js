Transactions = new Meteor.Collection('transactions', {
  schema: {
     userId: {
               type: String,
               label: 'User Identifier',
               optional: true
             },
     eventID: {
               type: String,
               label: 'ID of related Event'
               }
          },
      createdAt: {
          type: Date,
          autoValue: function() {
              if (this.isInsert) {
                  return new Date;
              } else if (this.isUpsert) {
                  return {$setOnInsert: new Date};
              } else {
                  this.unset();
              }
          },
          denyUpdate: true
      },
      // Force value to be current date (on server) upon update
      // and don't allow it to be set upon insert.
      updatedAt: {
          type: Date,
          autoValue: function() {
              if (this.isUpdate) {
                  return new Date();
              }
          },
          denyInsert: true,
          optional: true
      }
});

Transactions.allow({
  insert: function() {
            return true;
          },
  update: function() {
            return true;
          },
  remove: function() {
            return true;
          },
});

Transactions.eventFor = function(transaction) {
  return Events.findOne({ _id: transaction.eventID });
};
