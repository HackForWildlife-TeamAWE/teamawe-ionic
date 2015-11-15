/**
 * Created by manny on 11/15/15.
 */
angular.module('starter.directives',[]).directive('menu', function ($rootScope) {
  return {
    templateUrl: "/templates/navigation.html",
    restrict: 'A',
    link: function (scope, elem, attrs) {
      scope.search = function(){
        window.location = attrs.searchUrl + '?q=' + scope.query;
      }
    }
  };
});

