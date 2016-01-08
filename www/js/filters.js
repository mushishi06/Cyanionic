/**
 * Created by talanor on 1/7/16.
 */

angular.module('starter')
  .filter('to_trusted', ['$sce', function($sce){
    return function(text) {
      return $sce.trustAsHtml(text);
    };
  }]);
