/**
 * Created by talanor on 11/28/15.
 */

angular.module('starter')
.factory(
  'LocalStorage',
  [
    '$window',
    function($window) {
      function Storage() {
        this.cache = {};
      }

      Storage.isSupported = function() {
        return typeof $window.localStorage == 'object';
      };

      Storage.prototype.set = function(key, value) {
        this.cache[key] = value;

        if (Storage.isSupported() == true) {
          $window.localStorage.setItem(key, value);
        }
      };

      Storage.prototype.get = function(key) {
        var ret = null;

        if (key in this.cache) {
          ret = this.cache[key];
        } else if (Storage.isSupported() == true) {
          ret = $window.localStorage.getItem(key);

          if (ret) {
            this.cache[key] = ret;
          }
        }
        return ret;
      };

      Storage.prototype.remove = function(key) {
        if (key in this.cache) {
          delete this.cache[key];
        }
        if (Storage.isSupported() == true) {
          $window.localStorage.removeItem(key);
        }
      };

      return Storage;
    }
  ]
);
