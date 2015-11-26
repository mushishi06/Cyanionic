/**
 * Created by talanor on 11/26/15.
 */

angular.module('starter')
  .factory(
    'App',
    [
      '$rootScope', 'cyanAPI', '$cordovaFile',
      function($rootScope, cyanAPI, $cordovaFile) {
        function App(user, name) {
          this.name = name;
          this.user = user;
          this.onlineAttrs = {};
          this.offlineAttrs = {};
        }
        App.ATTRS_FILENAME = "attrs.json";

        App.normalizeName = function(name) {
          return name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
        };
        App.prototype.getPath = function() {
          return this.user.getAppsPath() + "/" + App.normalizeName(this.name);
        };

        App.prototype.getNormalizedName = function() {
          return App.normalizeName(this.name);
        };
        App.prototype.fetchOnlineInfos = function() {
          var self = this;
          return new Promise(function(resolve, reject) {
            cyanAPI.getAppInfos(self.user.username, self.user.password, self.name).then(
              function(response) {
                var attrs = response.data.app.attrs;

                for (var key in attrs) {
                  self.onlineAttrs[key] = attrs[key].version;
                }

                resolve();
              },
              function(response) {
                reject(self, response);
              }
            )
          });
        };
        App.prototype.fetchOfflineInfos = function() {
          var self = this;
          return new Promise(function(resolve, reject) {
            $cordovaFile.readAsText(self.getPath(), App.ATTRS_FILENAME).then(
              function(content) {
                self.offlineAttrs = JSON.parse(content);
                resolve();
              },
              function(err) {
                console.log("Could not fetch offline infos");
                console.log(err);
                reject({error: err, app: self});
              }
            );
          });
        };
        App.prototype.createLocally = function() {
          var self = this;
          return new Promise(function(resolve, reject) {
            self.makeDir().then(
              function () {
                self.user.addLocalApp(self);
                resolve(self);
              },
              function () {
                reject();
              }
            )
          });
        },
        App.prototype.makeDir = function() {
          var self = this;
          return new Promise(function(resolve, reject) {
            $cordovaFile.createDir(self.user.getAppsPath(), self.getNormalizedName(), false).then(
              function () {
                console.log("[SUCCESS] Built app's '" + self.getNormalizedName() + "' directory");
                resolve();
              },
              function () {
                console.log("[FAIL] Could not build app's '" + self.getNormalizedName() + "' directory");
                reject();
              }
            );
          });
        };
        App.prototype.takeOfflineAttrs = function(offlineApp) {
          this.offlineAttrs = offlineApp.offlineAttrs;
        };
        App.prototype.fetchOnlineSource = function() {

        };
        App.prototype.buildLocal = function() {

        };
        App.prototype.zip = function() {

        };

        return App;
      }
    ]
  );
