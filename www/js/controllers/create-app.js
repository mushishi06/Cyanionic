/**
 * Created by talanor on 11/26/15.
 */

angular.module('starter.controllers')
  .controller(
    'CreateAppCtrl',
    [
      '$rootScope', '$scope', 'App', '$state',
      function($rootScope, $scope, App, $state) {
        $scope.appData = {
          name: ""
        };

        $scope.go = function(page) {
          $state.go(page);
        }

        $scope.createApp = function() {
          console.log($scope.appData);

          var app = new App($rootScope.currentUser, $scope.appData.name);

          app.createLocally().then(
            function() {
              console.log("[SUCCESS] Created app '" + app.name + "' locally");
              $rootScope.currentApp = app;
              $scope.go('editor-panel');
            },
            function() {
              console.log("[FAIL] Failed to create locally");
            }
          )
        }

        $scope.$on('$ionicView.afterEnter', function () {
          console.log("ListAppsCtrl::afterEnter");
        });
      }
    ]
  );
