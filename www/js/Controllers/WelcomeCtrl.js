angular.module('starter.controllers')

.controller('WelcomeCtrl', function($scope, $timeout, $state) {
  var times = 3000;

  $scope.currentIndex = {
    index: 0
  };

  $timeout(updateIndex, times);

  function updateIndex(){

    $scope.currentIndex.index++;

    if ($scope.currentIndex.index < 4){
      $timeout(updateIndex, times);
    }

    if ($scope.currentIndex.index === 3){
      $state.go('home');
    }
  }
});
