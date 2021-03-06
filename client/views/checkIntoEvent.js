Template.checkIntoEvent.rendered = function() {
  Session.set('longitude', null);
  Session.set('latitude', null);

  //using pathFor, you can only pass in query strings (i.e. not a true null)
  //this means that we have to convert the null to a real null here
  if(this.data === "null") {
    this.data = null;
  }

  if(this.data) {
    $('#eventSelector').val(this.data);
    Session.set('eventId', this.data);
  } else {
    Session.set('eventId', null);
  }
};

Template.checkIntoEvent.helpers({
  'geolocationSuccessful': function() {
    return Session.get('longitude') && Session.get('eventId');
  },
  //TODO: make sure this is actually only active events
  'currentEvents': function() {
    return Events.currentEvents();
  },
  //TODO: have a graceful "please wait" screen while geolocating
  'eventSelected': function() {
    return Session.get('eventId');
  }
});

Template.checkIntoEvent.events({
  'change #eventSelector': function(e) {
    e.preventDefault();
    Session.set('eventId', $('#eventSelector option:selected').val());
  },
  'click #geoLocate': function(e) {
    e.preventDefault();
    
    var geoOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {


        Session.set('longitude', position.coords.longitude);
        Session.set('latitude', position.coords.latitude);
          
      }, function(error) {
        addErrorMessage(error.message);
      }, geoOptions);
    } else {
      addErrorMessage('Geolocation not supported');
    }
  },
  'click #checkInByPhoto': function(e) {
    e.preventDefault();

    Router.go('takePicture', {_id: Session.get('eventId')});
  },
  'click #cancel': function(e) {
    Session.set('eventId', null);
    Session.set('longitude', null);
    Session.set('latitude', null);
  },
  'click #submit': function(e) {
    e.preventDefault();

    var attributes = {
      userId: Meteor.userId(),
      eventId: Session.get('eventId'),
      userLong: Session.get('longitude'),
      userLat: Session.get('latitude'),
      hoursSpent: parseInt($('#hours').val(),10),
      minutesSpent: parseInt($('#minutes').val(),10),
    };

    Meteor.call('geolocateUser', attributes,
      function(error, result) {
        if(error) {
          addErrorMessage(error.reason);
          Session.set('longitude', null);
          Session.set('latitude', null);
          Session.set('eventId', null);
        } else {
          addSuccessMessage(result);
          Router.go('checkPoints');
        }

    });
  }         
});
