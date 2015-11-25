/**
 * Created by talanor on 11/25/15.
 */

angular.module('starter.controllers')
  .controller(
    'LoginCtrl',
    [
      '$rootScope', '$scope', '$ionicModal', '$timeout', '$state', 'cyanAPI',
      function($rootScope, $scope, $ionicModal, $timeout, $state, cyanAPI) {
        $scope.user = {};

        $scope.go = function(page) {
          $state.go(page);
        }

        // Perform the login action when the user submits the login form
        $scope.login = function() {
          cyanAPI.welcome($scope.user.username, $scope.user.password).then(
            function() {
              $rootScope.user = $scope.user;
              $scope.go('cyan.main-logged-panel');
            },
            function() {

            }
          )
        };
      }
    ]
  );
