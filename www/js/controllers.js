angular.module('starter.controllers', [])

.controller('CyanCtrl', function($scope, $ionicModal, $timeout, $state) {
    $scope.$on('$ionicView.afterEnter', function () {
      console.log("CyanCtrl::afterEnter");
      var links = document.getElementsByClassName("docs-css");
      console.log(links);
      for (var i = 0 ; i < links.length ; ++i) {
        angular.element(links[i]).remove();
      }

      var head = angular.element(document.getElementsByTagName("head")[0]);

      links = document.getElementsByClassName("ionic-css");
      if (links.length == 0) {
        head.append(angular.element('<link href="lib/ionic/css/ionic.css" class="ionic-css" rel="stylesheet" />'));
      }
    });

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    loadPage('cyan.browse');
    // $scope.modal.hide();
  };

  loadPageControler = function(page)
  {
      $state.go(page);
  }

  // Open the login modal
  // $scope.login = function() {
  //   $scope.modal.show();
  // };

  // Perform the login action when the user submits the login form
  $scope.userIdentification = function() {
    console.log('Doing login', $scope.loginData);
    cyan.userIdentification($scope.loginData.username ,$scope.loginData.password);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    // $timeout(function() {
    //    $scope.closeLogin();
    // }, 1000);
  };


})

.controller('EditorCtrl', function($scope, $ionicModal, $cordovaFile, $timeout, $state) {
    $scope.$on('$ionicView.afterEnter', function () {
      console.log("EditorCtrl::afterEnter");
      var links = document.getElementsByClassName("ionic-css");
      console.log(links);
      for (var i = 0 ; i < links.length ; ++i) {
        angular.element(links[i]).remove();
      }

      var head = angular.element(document.getElementsByTagName("head")[0]);

      links = document.getElementsByClassName("docs-css");
      if (links.length == 0) {
        head.append(angular.element('<link href="css/editor-css/docs.min.css" class="docs-css" rel="stylesheet" />'));
      }
      console.log(cordova.file);
      console.log(cordova.file.externalDataDirectory);
      cyan.test($cordovaFile, cordova.file.externalDataDirectory);
    });

    //ngCordova.plugins.file.writeFile(path, fileName, text, replaceBool);
    //ngCordova.plugins.file.readAsText(path, fileName);
    //ngCordova.plugins.file.createDir(path, dirName, replaceBool)
})
.controller('VoidCtrl', function($scope, $ionicModal, $timeout, $state) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    // $ionicModal.fromTemplateUrl('templates/login.html', {
    //   scope: $scope
    // }).then(function(modal) {
    //   $scope.modal = modal;
    // });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      loadPage('cyan.browse');
      // $scope.modal.hide();
    };

    loadPageControler = function(page)
    {
      $state.go(page);
    }

    // Open the login modal
    // $scope.login = function() {
    //   $scope.modal.show();
    // };

    // Perform the login action when the user submits the login form
    $scope.userIdentification = function() {
      console.log('Doing login', $scope.loginData);
      cyan.userIdentification($scope.loginData.username ,$scope.loginData.password);
      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      // $timeout(function() {
      //    $scope.closeLogin();
      // }, 1000);
    };

  });
