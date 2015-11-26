/**
 * Created by talanor on 11/25/15.
 */

angular.module('starter.controllers')
  .controller(
    'ListAppsCtrl',
    [
      '$rootScope', '$scope', '$state',
      function($rootScope, $scope, $state) {
        $scope.go = function(page) {
          $state.go(page);
        }

        $scope.$on('$ionicView.afterEnter', function () {
          console.log("ListAppsCtrl::afterEnter");
        });

        $scope.editApp = function(app) {
          $rootScope.currentApp = app;
          $scope.go('editor-panel');
        }
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
