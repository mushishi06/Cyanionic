/**
 * Created by talanor on 11/25/15.
 */

angular.module('starter')
.factory(
  "cyanAPI",
  [
    '$http',
    function($http) {
      return {
        scheme: "http",
        host: "cyandev.xyz",
        port: 5555,
        timeout: 2000,
        getUrl: function(path) {
          return this.scheme + "://" + this.host + ":" + this.port + path;
        },
        listApps: function(username, password) {
          var self = this;

          return new Promise(
            function(resolve, reject) {
              console.log("[API] [POST] /api/list_apps");
              $http({
                url: self.getUrl("/api/list_apps"),
                method: "POST",
                data: {
                  username: username,
                  password: password
                },
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                timeout: self.timeout
              }).then(
                resolve,
                reject
              );
            }
          );
        },
        welcome: function(username, password) {
          var self = this;

          return new Promise(
            function(resolve, reject) {
              console.log("[API] [POST] /api/welcome");
              $http({
                url: self.getUrl("/api/welcome"),
                method: "POST",
                data: {
                  username: username,
                  password: password
                },
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                timeout: self.timeout
              }).then(
                resolve,
                reject
              );
            }
          );
        }
      }
    }
  ]
);
