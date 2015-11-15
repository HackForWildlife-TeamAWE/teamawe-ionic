var map;
window.initMap = function initMap() {
  if(document.getElementById('google-map')){
    map = new google.maps.Map(document.getElementById('google-map'), {
      center: {lat: 39.0997, lng: -94.5783},
      zoom: 12,
      scrollwheel:false,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    //var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"on"},{"hue":"#ff0000"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"on"},{"weight":"1.89"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.line","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"color":"#469ee0"}]},{"featureType":"transit.station.bus","elementType":"all","stylers":[{"visibility":"on"},{"hue":"#ff0000"}]},{"featureType":"transit.station.bus","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.bus","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.rail","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.rail","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.rail","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#469ee0"},{"visibility":"on"}]}]
    //map.setOptions({styles: styles});

  }
}
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('MapCtrl', function($scope, $http) {
  $scope.map = { center: { latitude: 0.1930, longitude: 37.42 }, zoom: 14 };
  $scope.markers = [];
  var idKey = "id";
  function init(){
    //get location data for animal
    $http.get('http://teamawe.herokuapp.com/api/locations').then(function(results){
      if(results.data.success){
        var ndx = 0;
        var locations = getDayLocations(results.data.data,15,1,2015);
        _.each(locations, function(mapItem){
          addMarker(mapItem.latitude,mapItem.longitude,'Walter', ndx);
          ndx++;
        });
        //map.fitBounds(bounds);
      }
    })
  }

  function getDayLocations(locations, day, month, year){
    return _.filter(locations,function(location){
      var date = new Date(new Date(location.date));
      return date.getDate() == day && month == (date.getMonth()+1) && date.getFullYear() == year;
    })
  }

  function addMarker(lat, lng, name, ndx){
    var myLatLng = {latitude: lat, longitude: lng, title:name};
    myLatLng[idKey] = ndx;
    $scope.markers.push(myLatLng);
  }
  init();
});
