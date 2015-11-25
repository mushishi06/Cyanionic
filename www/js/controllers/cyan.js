/**
 * Created by talanor on 11/25/15.
 */

angular.module('starter.controllers')
  .controller(
    'CyanCtrl',
    [
      '$scope', '$ionicModal', '$timeout', '$state',
      function($scope, $ionicModal, $timeout, $state) {
        $scope.$on(
          '$ionicView.afterEnter',
          function () {
            console.log("CyanCtrl::afterEnter");
            var links = document.getElementsByClassName("docs-css");
            for (var i = 0 ; i < links.length ; ++i) {
              angular.element(links[i]).remove();
            }

            var head = angular.element(document.getElementsByTagName("head")[0]);

            links = document.getElementsByClassName("ionic-css");
            if (links.length == 0) {
              head.append(angular.element('<link href="lib/ionic/css/ionic.css" class="ionic-css" rel="stylesheet" />'));
            }
          }
        );

        $scope.loginData = {};

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
          loadPage('cyan.browse');
          // $scope.modal.hide();
        };

        loadPageControler = function(page)
        {
          $state.go(page);
        }

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

        $scope.appList = [
          { name: 'bob', id: 0 },
          { name: 'Reggae', id: 1 },
          { name: 'titi',id: 2 },
          { name: 'appcyan',id: 3 },
          { name: 'kiki',id: 4 },
          { name: 'jawad',id: 5 },
          { name: 'plus de nom',id: 7 }
        ];

        $scope.appsListing = function() {
          console.log('Listing app', $scope.appList);
          cyan.appsListing();
        };

        appsListingFinish = function(data) {
          console.log("appsListingFinish", data);
          // if (data == null || data.status == "KO") {
          //   this.errorMessage = (data) ? (data.msg) : ("An unknown error occured.");
          //   // do display error
          // } else {
          // update $appList
          loadPageControler('cyan.list-apps-panel');
          // }
        };
      }
    ]
  );
