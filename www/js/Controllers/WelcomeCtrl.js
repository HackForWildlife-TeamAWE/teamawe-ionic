angular.module('starter.controllers')

.controller('WelcomeCtrl', function($scope, $timeout, $state) {
  $timeout(function(){
    $state.go('home');
  }, 2000);
});
