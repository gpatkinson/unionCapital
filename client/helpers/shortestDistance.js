//code adapted from http://www.sitepoint.com/forums/showthread.php?
//923652-Find-record-with-closest-latitude-longitude-from-
//stringify-ed-data-in-localstorage

//input: user Location as lat long, array of Events
//TODO: move this to lib/helpers along with haversine formula function below?
closestLocation = function(userLocation, events) {
  function vectorDistance(dx, dy) {
    return Math.sqrt(dx * dx + dy * dy);
  }
  function locationDistance(loc1, loc2) {
    var dx = loc1.lat - loc2.lat,
    dy = loc1.lng - loc2.lng;

    return vectorDistance(dx, dy);
  }

  //TODO: I know the below duplicates a calculation, but it's a quick one
  //and stupid and quick was neccessary over long and elegant on August 1, 2014
  var shortestDistanceEvent = events.reduce(function(prev, current) {
    var prevDistance = locationDistance(userLocation, prev);
    currentDistance = locationDistance(userLocation, current);
    return (prevDistance < currentDistance) ? prev : current;
  });

  var distance = haversineFormula(shortestDistanceEvent, userLocation.lng, userLocation.lat);

  return {
    event: shortestDistanceEvent,
    distance: distance
  };
};
