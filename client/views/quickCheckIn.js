Session.setDefault('closestEvent', null);
Session.setDefault('timeEntered', false);

Template.quickCheckIn.rendered = function() {
  var closestEvent = closestLocation(this.data, 
                                     Events.find({active: 1}).fetch());
  
  //TODO: magic number below, will be set eventually in admin 
  //dashboard
  if(closestEvent.distance < 0.1)  {
    Session.set('closestEvent',closestEvent.event);
  } else {
    addErrorMessage('The closest event is further than 100 meters away. Please' +
                    ' move closer or Submit a Photo');
    Router.go('memberHomePage');
  }
};

Template.quickCheckIn.helpers({
  'closestEvent': function() {
    return Session.get('closestEvent');
  },
  'isPointsPerHour': function() {
    return Session.get('closestEvent').isPointsPerHour;
  }
});

Template.quickCheckIn.events({
  'click #closestEvent': function(e) {
  },
  'change .time': function(e) {
    e.preventDefault();
    Session.set('timeEntered', true);
  },
  'click #checkIn': function(e) {
    e.preventDefault();

    var attributes = {
      userId: Meteor.userId(),
      eventId: Session.get('closestEvent')._id,
      needsApproval: false,
      transactionDate: Date(),
      hoursSpent: parseInt($('#hours').val(),10) || 0,
      minutesSpent: parseInt($('#minutes').val(),10) || 0
    };
    //if it is a points per hour event than the user
    //has to enter points
    if(!Session.get('closestEvent').isPointsPerHour || Session.get('timeEntered')) {
      
      Meteor.call('insertTransaction', attributes, function(error) {
        if(error) {
          addErrorMessage(error.reason + ". Transferring you to more check-in options.");
          Router.go('memberHomePage');
        } else {
          addSuccessMessage('Added points to your total!');
          Router.go('checkPoints', {_id: Meteor.userId()});
        }
      });
    } else {
      addErrorMessage('Please ensure you have filled in the time spent');
    }

  }
});

