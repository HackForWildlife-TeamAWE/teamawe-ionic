/**
 * Created by manny on 11/15/15.
 */
angular.module('starter.directives').directive('footer', function ($rootScope) {
  return {
    templateUrl: "/templates/footer-tabs.html",
    restrict: 'A',
    link: function (scope, elem, attrs) {
      //scope.search = function(){
      //  window.location = attrs.searchUrl + '?q=' + scope.query;
      //}
    }
  };
});

/**
 * Created by manny on 11/15/15.
 */
