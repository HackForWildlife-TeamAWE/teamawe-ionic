angular.module('starter.controllers')

.controller('WelcomeCtrl', function($scope, $timeout, $state) {
  // $timeout(function(){
  //   $state.go('home');
  // }, 2000);
  //
  $scope.currentIndex = {
    index: 0
  };

  $timeout(updateIndex, 2000);

  function updateIndex(){
    $scope.currentIndex.index++;

    if ($scope.currentIndex < 3){
      updateIndex();
    }
  }
});
