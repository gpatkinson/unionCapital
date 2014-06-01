Events = new Meteor.Collection('events', {
  schema: {
            name: {
                     type: String,
                     label: 'Name of Event'
                  },
            address: {
                       type: String,
                       label: 'Address of Event'
                     },
            description: {
                           type: String,
                           label: 'Description of Event'
                         },
            active: {
                      type: Number,
                      label: 'Is event active?',
                      allowedValues: [0,1],
                      defaultValue: 1
                    },
            startDate: {
                         type: Date,
                         label: 'Beginning of Event'
                       },
            endDate: {
                       type: Date,
                       label: 'End of Event'
                     },
            points: {
                       type: Number,
                       label: 'Amount of Points'
                     },
            url: {
                       type: String,
                       label: 'URL to the event'
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
  }
});

Events.allow({
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
