/**
 * Created by talanor on 11/25/15.
 */

angular.module('starter.controllers')
  .controller(
    'ListAppsCtrl',
    [
      '$scope', '$ionicModal', 'cyanAPI',
      function($scope, $ionicModal, cyanAPI) {
        $scope.appList = [];

        $scope.$on('$ionicView.afterEnter', function () {
          console.log("ListAppsCtrl::afterEnter");
          console.log(cyanAPI);
          cyanAPI.listApps("foo", "foobar").then(
            function(response) {
              console.log("[SUCCESS]");
              console.log(response);

              for (var i in response.data.names) {
                $scope.appList.push({name: response.data.names[i], id: i});
              }

              console.log($scope.appList);
              $scope.$apply();

            },
            function(response) {
              console.log("[FAILURE]");
              console.log(response);
            }
          );
        });
      }
    ]
  );
