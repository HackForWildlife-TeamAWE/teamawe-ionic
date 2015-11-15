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
.controller('MapCtrl', function($scope, $http, $timeout) {
  $scope.map = { center: { latitude: 0.1930, longitude: 37.44 }, zoom: 14 };
  $scope.markers = [];
  $scope.date = new Date(2015,0,15);

  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  //$scope.day = 15;
  //$scope.month= 1;
  //$scope.year = 2015;
  $scope.formatDate = function(){
    return monthNames[$scope.date.getMonth()] + ' ' + $scope.date.getDate() + ', ' + $scope.date.getFullYear();
  }
  $scope.allMarkers = [];
  var idKey = "id";
  function init(){
    //get location data for animal
    $http.get('http://teamawe.herokuapp.com/api/locations').then(function(results){
      if(results.data.success){
        $scope.allMarkers = results.data.data;
        var locations = getDayLocations($scope.allMarkers);
        updateMap(locations);
      }
    })
  }
  $scope.nextDay = function(){
    clearMap();
    $scope.date.setDate($scope.date.getDate() + 1);
    var locations = getDayLocations($scope.allMarkers);
    updateMap(locations);
  }
  function clearMap(){
    $scope.markers = [];
    ndx = 0;
  }
  var ndx = 0;
  function updateMap(locations){
    $timeout(function(){
      if(ndx < locations.length){
        var mapItem = locations[ndx];
        addMarker(mapItem.latitude,mapItem.longitude,'Walter', ndx);
        ndx++;
        updateMap(locations)
      }
    }, 500);
  }
  function getDayLocations(locations){
    return _.filter(locations,function(location){
      var date = new Date(new Date(location.date));
      return date.getDate() == $scope.date.getDate() && date.getMonth() == $scope.date.getMonth() && date.getFullYear() == $scope.date.getFullYear();
    })
  }

  function addMarker(lat, lng, name, ndx){
    var myLatLng = {latitude: lat, longitude: lng, title:name};
    myLatLng[idKey] = ndx;
    $scope.markers.push(myLatLng);
    $scope.$digest();
  }
  init();
});
