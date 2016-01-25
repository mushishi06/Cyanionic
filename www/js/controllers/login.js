/**
 * Created by talanor on 11/25/15.
 */

angular.module('starter.controllers')
  .controller(
    'LoginCtrl',
    [
      '$rootScope', '$scope', '$ionicModal', '$timeout', '$state', '$css', 'User',
      function($rootScope, $scope, $ionicModal, $timeout, $state, $css, User) {
        $scope.tryingLogin = false;

        $scope.user = {};

        $scope.go = function(page) {
          $state.go(page);
        }

        // Perform the login action when the user submits the login form
        $scope.login = function() {
          $scope.tryingLogin = true;
          $rootScope.currentUser = new User($scope.user.username, $scope.user.password);

          $rootScope.currentUser.login().then(
            function() {
              $scope.tryingLogin = false;
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
