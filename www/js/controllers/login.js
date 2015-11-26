/**
 * Created by talanor on 11/25/15.
 */

angular.module('starter.controllers')
  .controller(
    'LoginCtrl',
    [
      '$rootScope', '$scope', '$ionicModal', '$timeout', '$state', 'User',
      function($rootScope, $scope, $ionicModal, $timeout, $state, User) {
        $scope.user = {};

        $scope.go = function(page) {
          $state.go(page);
        }

        // Perform the login action when the user submits the login form
        $scope.login = function() {
          $rootScope.currentUser = new User($scope.user.username, $scope.user.password);

          $rootScope.currentUser.login().then(
            function() {
              console.log("[SUCCESS] Logged in");
              $scope.go('cyan.main-logged-panel');
            },
            function(errorText) {
              console.log("[FAILURE] Not logged in");
              console.log(errorText);
              $rootScope.currentUser = null;
            }
          );
        };
      }
    ]
  );
