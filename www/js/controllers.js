angular.module('starter.controllers', []);

angular.module('starter.controllers')
  .controller('VoidCtrl', function($scope, $ionicModal, $timeout, $state) {
    $scope.go = function(page) {
      $state.go(page);
    }
  });
