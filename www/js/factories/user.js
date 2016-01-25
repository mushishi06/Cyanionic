/**
 * Created by talanor on 11/26/15.
 */

angular.module('starter')
.factory(
  'User',
  [
    '$rootScope', '$cordovaFile', '$window', 'cyanAPI', 'App',
    function($rootScope, $cordovaFile, $window, cyanAPI, App) {
      function User(username, password) {
        this.username = username;
        this.password = password;
        this.offlineApps = {};
        this.onlineApps = {};
        this.apps = {};
      }

      User.normalizeName = function(name) {
        return name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
      };

      User.prototype.getNormalizedUsername = function() {
        return User.normalizeName(this.username);
      };
      User.prototype.login = function() {
        var self = this;
        return new Promise(function(resolve, reject) {
          cyanAPI.welcome(self.username, self.password).then(
            function() {
              var listOnlineAppsPromise = self.listOnlineApps();
              var listOfflineAppsPromise = self.listOfflineApps();

              listOnlineAppsPromise.then(
                function(apps) {
                  self.onlineApps = apps;
                  console.log("[SUCCESS] Online app listing complete");
                },
                function(errorText) {
                  console.log("[FAIL] Online app listing failed");
                }
              );
              listOfflineAppsPromise.then(
                function(apps) {
                  self.offlineApps = apps;
                  console.log("[SUCCESS] Offline app listing complete");
                },
                function(errorText) {
                  console.log("[FAIL] Offline app listing failed");
                }
              );

              Promise.all([listOnlineAppsPromise, listOfflineAppsPromise]).then(
                function() {
                  console.log("[SUCCESS] Full app listing complete");
                  self.mergeApps();
                  resolve();
                },
                function(errorText) {
                  console.log("[FAIL] Full app listing failed");
                  console.log(errorText);
                  reject(errorText);
                }
              );
            },
            function(errorText) {
              reject("[FAIL] Could not fetch welcome message");
            }
          );
        });
      };

      User.prototype.listOnlineApps = function() {
        var self = this;
        return new Promise(function(resolve, reject) {
          cyanAPI.listApps(self.username, self.password).then(
            function(response) {
              var apps = {};
              var appspromises = [];

              for (var i in response.data.names) {
                var app = new App(self, response.data.names[i]);
                apps[app.name] = app;
                appspromises.push(
                  new Promise(function(sresolve, sreject) {
                    app.fetchOnlineInfos().then(
                      function() {
                        console.log("Retrieved online infos, trying to get state");
                        app.getOnlineState().then(
                          function() {
                            console.log("[SUCCESS] Retrieved state in listing");
                            sresolve();
                          },
                          function() {
                            console.log("[FAIL] Could not retrieve state in listing");
                            sreject();
                          }
                        );
                      },
                      function(app, response) {
                        console.log(app);
                        console.log(response);
                        sreject("[FAIL] Could not fetch app: '" + app.name + "'");
                      }
                    );
                  })
                );
              }

              Promise.all(appspromises).then(
                function() {
                  console.log("[SUCCESS] Fetched online apps");
                  resolve(apps);
                },
                function(errorText) {
                  console.log("All failed: ");
                  console.log(errorText);
                  reject("[FAIL] Could not fetch all apps\n" + errorText);
                }
              );
            },
            function(response) {
              console.log(response);
              reject("[FAIL] Could not fetch apps");
            }
          )
        });
      }

      User.prototype.getAppsPath = function() {
        return $rootScope.rootPath + "/" + this.getNormalizedUsername();
      };

      User.prototype.listOfflineApps = function() {
        var self = this;

        return new Promise(function(resolve, reject) {
          $window.resolveLocalFileSystemURL(
            self.getAppsPath(),
            function (directoryEntry) {
              var dirReader = directoryEntry.createReader();

              dirReader.readEntries(
                function (entries) {
                  var apps = {};
                  var appPromises = [];

                  for (var i in entries) {
                    if (entries[i].isDirectory == true) {
                      var app = new App(self, entries[i].name);
                      apps[app.name] = app;

                      appPromises.push(
                        new Promise(function(sresolve, sreject) {
                          app.fetchOfflineInfos().then(
                            function() {
                              sresolve();
                            },
                            function(err) {
                              console.log("Determining error type");
                              console.log(err);
                              if (err.error.code == 1) {
                                console.log("File not found, trying to ignore app");
                                console.log(err);
                                //errApp.deleteLocally();
                                delete apps[err.app.name];
                                sresolve();
                              } else {
                                console.log("Rejecting app")
                                sreject();
                              }
                            }
                          );
                        })
                      );
                    }
                  }

                  Promise.all(appPromises).then(
                    function() {
                      console.log("[SUCCESS] Fetched offline apps");
                      resolve(apps);
                    },
                    function(error) {
                      console.log("[FAIL] Could not fetch offline apps");
                      reject(error);
                    }
                  );
                },
                function() {
                  console.log("[FAIL] Could not read entries");
                  reject("[FAIL] Could not read entries");
                }
              );
            },
            function() {
              // User dir not existing
              console.log("User's apps directory empty");
              $cordovaFile.createDir($rootScope.rootPath, self.getNormalizedUsername(), false).then(
                function() {
                  console.log("[SUCCESS] Created empty User's apps directory");
                  resolve({});
                },
                function(error) {
                  console.log("[SUCCESS] Could not create an User's apps directory");
                  console.log(error);
                  reject(error);
                }
              )
            }
          );
        });
      };
      User.prototype.mergeApps = function() {
        this.apps = {};
        for (var key in this.onlineApps) {
          this.apps[key] = this.onlineApps[key];
        }
        for (var key in this.offlineApps) {
          if (key in this.apps) {
            this.apps[key].takeOfflineAttrs(this.offlineApps[key]);
          } else {
            this.apps[key] = this.offlineApps[key];
          }
        }
      };
      User.prototype.updateApps = function() {
        var self = this;

        return new Promise(function(resolve, reject) {
          var fetchPromises = [];

          for (var key in self.apps) {
            fetchPromises.push(self.apps[key].updateFromOnline());
          }
          Promise.all(fetchPromises).then(
            resolve,
            reject
          );
        });
      };
      User.prototype.addLocalApp = function(app) {
        this.offlineApps[app.name] = app;
        this.apps[app.name] = app;
      };
      User.prototype.removeAppFromLists = function(app) {
        delete this.offlineApps[app.name];
        delete this.onlineApps[app.name];
        delete this.apps[app.name];
      };

      return User;
    }
  ]
);
