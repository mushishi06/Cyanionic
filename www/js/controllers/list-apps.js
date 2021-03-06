/**
 * Created by talanor on 11/25/15.
 */

angular.module('starter.controllers')
  .controller(
    'ListAppsCtrl',
    [
      '$rootScope', '$scope', '$state', '$css',
      function($rootScope, $scope, $state, $css) {
        $scope.refreshApps = function() {
          console.log("Refreshing apps");
          $rootScope.currentUser.updateApps().then(
            function() {
              $scope.$broadcast('scroll.refreshComplete');
            },
            function() {
              $scope.$broadcast('scroll.refreshComplete');
            }
          )
          console.log("Apps refreshed");
        };

        $scope.go = function(page) {
          $state.go(page);
        }

        $scope.$on('$ionicView.afterEnter', function () {
          console.log("ListAppsCtrl::afterEnter");
        });

        $scope.editApp = function(app) {
          $rootScope.currentApp = app;
          $scope.go('editor-panel');
        };

        $scope.getBadgeClass = function(app) {
          var ret = 'badge-assertive';

          if (app.stateName == 'Offline') {
            ret = 'badge-dark';
          } else if (app.stateName == 'Online') {
            ret = 'badge-calm';
          } else if (app.stateName == 'Compiling') {
            ret = 'badge-energized';
          } else if (app.stateName == 'Compiled') {
            ret = 'badge-balanced';
          } else if (app.stateName == 'Published') {
            ret = 'badge-royal';
          }
          return ret;
        };

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
        };

        $scope.publishApp = function(app) {
          app.publish().then(
            function() {
              console.log("[SUCCESS] Published");
            },
            function() {
              console.log("[FAILED] Not published");
            }
          )
        }

        $scope.removeApp = function(app) {
          app.delete().then(
            function() {
              console.log("[SUCCESS] Removed");
              $scope.$broadcast('scroll.infiniteScrollComplete')
            },
            function() {
              console.log("[FAILED] Not removed");
            }
          )
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
