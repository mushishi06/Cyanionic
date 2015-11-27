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

        $scope.compileApp = function(app) {
          app.buildLocal().then(
            function() {
              app.generateZip().then(
                function () {
                  console.log("[SUCCESS] Zipped the app");
                  console.log("Sending app");
                  app.sendOnline().then(
                    function () {
                      console.log("Compiling app");
                      app.compile().then(
                        function () {
                          console.log("[SUCCESS] App compiled");
                        },
                        function () {
                          console.log("[FAIL] Failed to compile app");
                        }
                      );
                    },
                    function () {
                      console.log("[FAIL] Failed to send app");
                    }
                  );
                },
                function (error) {
                  console.log("[FAIL] Failed to zip app");
                  console.log(error);
                }
              );
            },
            function(error) {
              console.log("[FAIL] Could not build local");
              console.log(error);
            }
          );
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
