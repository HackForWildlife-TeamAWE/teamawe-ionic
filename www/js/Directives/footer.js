/**
 * Created by manny on 11/15/15.
 */
angular.module('starter.directives').directive('footer', function ($rootScope, $state) {
  return {
    templateUrl: "/templates/footer-tabs.html",
    restrict: 'A',
    link: function (scope, elem, attrs) {
      if($state.current.name == 'home'){
        scope.timelineActive = true;
      }
      if($state.current.name == 'friends'){
        scope.friendsActive = true;
      }
      if($state.current.name == 'discover'){
        scope.discoverActive = true;
      }
      if($state.current.name == 'donate'){
        scope.donateActive = true;
      }
      //scope.search = function(){
      //  window.location = attrs.searchUrl + '?q=' + scope.query;
      //}
    }
  };
});

/**
 * Created by manny on 11/15/15.
 */
