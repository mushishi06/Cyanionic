/**
 * Created by talanor on 11/25/15.
 */

angular.module('starter.controllers')
  .controller(
    'ListAppsCtrl',
    [
      '$scope',
      function($scope) {
        $scope.go = function(page) {
          $state.go(page);
        }

        $scope.$on('$ionicView.afterEnter', function () {
          console.log("ListAppsCtrl::afterEnter");
        });
      }
    ]
  )
  .directive(
    'listAppsCompile',
    [
      '$ionicGesture',
      function($ionicGesture) {
        return {
          link: function(scope, element, attrs) {
            $ionicGesture.on(
              'click',
              function(event) {

              },
              element
            );
          }
        };
      }
    ]
  );
