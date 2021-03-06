/**
 * Created by talanor on 11/26/15.
 */

angular.module('starter')
  .factory(
    'App',
    [
      '$rootScope', 'cyanAPI', '$cordovaFile', '$window',
      function($rootScope, cyanAPI, $cordovaFile, $window) {
        function App(user, name) {
          this.name = name;
          this.normalizedName = App.normalizeName(this.name);
          this.user = user;
          this.onlineAttrs = {};
          this.offlineAttrs = {};
          this.stateName = 'Offline';
          this.canCompile = true;
          this.canPublish = false;
        }
        App.ATTRS_FILENAME = "attrs.json";
        App.STATES_MAP = {
          'offline': 'Offline',
          'compiling': 'Compiling',
          'compiled': 'Compiling',
          'retrieved': 'Compiled',
          'published': 'Published',
          'null': 'Online'
        };

        App.normalizeName = function(name) {
          return name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
        };
        App.prototype.getPath = function() {
          return this.user.getAppsPath() + "/" + App.normalizeName(this.name);
        };
        App.prototype.delete = function() {
          var self = this;

          return new Promise(function(resolve, reject) {
            if (this.stateName != "Offline") {
              cyanAPI.deleteApp(self.user.username, self.user.password, self.name).then(
                function() {
                  $cordovaFile.removeFile(self.getPath(), App.ATTRS_FILENAME).then(
                    function() {
                      self.user.removeAppFromLists(self);
                      resolve();
                    },
                    reject
                  );
                },
                function() {
                  reject();
                }
              )
            } else {
              $cordovaFile.removeFile(self.getPath(), App.ATTRS_FILENAME).then(
                function() {
                  self.user.removeAppFromLists(self);
                  resolve();
                },
                reject
              );
            }
          });
        };
        App.prototype.fetchOnlineInfos = function() {
          var self = this;
          return new Promise(function(resolve, reject) {
            cyanAPI.getAppInfos(self.user.username, self.user.password, self.name).then(
              function(response) {
                var attrs = response.data.app.attrs;

                for (var key in attrs) {
                  self.onlineAttrs[key] = attrs[key];
                }

                resolve();
              },
              function(response) {
                reject(self, response);
              }
            )
          });
        };
        App.prototype.getOnlineState = function() {
          var self = this;

          return new Promise(function(resolve, reject) {
            cyanAPI.getAppState(self.user.username, self.user.password, self.normalizedName).then(
              function(response) {
                console.log("[SUCCESS] Retrieved app state");
                console.log(response);
                if (response.data.state == 'retrieved') {
                  self.canPublish = true;
                }
                if (typeof response.data.state != "undefined") {
                  self.stateName = App.STATES_MAP[response.data.state];
                } else {
                  self.stateName = App.STATES_MAP[response.data.status];
                }
                resolve();
              },
              function(error) {
                reject(error);
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
        App.prototype.saveAttrsLocally = function() {
          var self = this;
          return new Promise(function(resolve, reject) {
            $cordovaFile.writeFile(
              self.getPath(),
              App.ATTRS_FILENAME,
              JSON.stringify(self.offlineAttrs),
              true
            ).then(
              resolve,
              reject
            );
          });
        };
        App.prototype.createLocally = function() {
          var self = this;
          return new Promise(function(resolve, reject) {
            self.offlineAttrs.version = 1;
            self.makeDir().then(
              function () {
                self.saveAttrsLocally().then(
                  function() {
                    console.log("Saving attrs locally");
                    self.user.addLocalApp(self);
                    resolve(self);
                  },
                  function(error) {
                    console.log("Could not save attrs file");
                    console.log(error);
                    reject();
                  }
                );
              },
              function () {
                reject();
              }
            )
          });
        };
        App.prototype.makeDir = function() {
          var self = this;
          return new Promise(function(resolve, reject) {
            $cordovaFile.createDir(self.user.getAppsPath(), self.normalizedName, false).then(
              function () {
                console.log("[SUCCESS] Built app's '" + self.normalizedName + "' directory");
                resolve();
              },
              function (error) {
                console.log("[FAIL] Could not build app's '" + self.normalizedName + "' directory");
                console.log(error);
                if (error.code == 12) {
                  resolve();
                } else {
                  reject();
                }
              }
            );
          });
        };
        App.prototype.sendOnline = function() {
          var self = this;

          return new Promise(function(resolve, reject) {
            cyanAPI.sendApp(
              self.user.username,
              self.user.password,
              self.name,
              self.user.getAppsPath() + "/" + self.normalizedName + ".zip"
            ).then(
              function () {
                console.log("[SUCCESS] Sent zip online");
                ++self.offlineAttrs.version;
                ++self.onlineAttrs.version;
                self.saveAttrsLocally().then(
                  function() {
                    resolve();
                  },
                  function() {
                    console.log("[FAILED] Failed to store new version number, nonblocking resolving anyway");
                    resolve();
                  }
                );
              },
              function () {
                console.log("[FAIL] Could not send zip online");
                reject();
              }
            );
          });
        };
        App.prototype.compile = function() {
          var self = this;

          return new Promise(function(resolve, reject) {
            cyanAPI.compileApp(self.user.username, self.user.password, self.normalizedName, ['android']).then(
              function() {
                resolve();
              },
              function() {
                reject();
              }
            );
          });
        };
        App.prototype.publish = function() {
          var self = this;

          return new Promise(function(resolve, reject) {
            cyanAPI.publishApp(self.user.username, self.user.password, self.normalizedName, ['android']).then(
              function() {
                resolve();
              },
              function() {
                reject();
              }
            );
          });
        };
        App.prototype.generateZip = function() {
          var self = this;

          return new Promise(function(resolve, reject) {
            var zip = new JSZip();
            var promises = [];
            var error = false;

            function zipDir(directoryEntry, path) {
              return new Promise(function (resolve, reject) {
                var dirReader = directoryEntry.createReader();

                dirReader.readEntries(
                  function (entries) {
                    var rPromises = [];

                    var newPath = path;

                    if (newPath.length > 0) {
                      newPath += "/";
                    }
                    for (i in entries) {
                      if (entries[i].isDirectory == true) {
                        rPromises.push(
                          zipDir(entries[i], newPath + entries[i].name)
                        );
                      } else if (entries[i].isFile == true) {
                        promises.push(
                          new Promise(function (resolve, reject) {
                            var curPath = newPath;
                            var curName = entries[i].name;
                            $cordovaFile.readAsArrayBuffer(self.getPath() + "/" + curPath, curName)
                              .then(
                                function (result) {
                                  resolve({filePath: curPath, fileName: curName, content: result});
                                },
                                function (error) {
                                  reject({filePath: curPath, fileName: curName, content: error});
                                }
                              );
                          })
                        );
                      }
                    }

                    Promise.all(rPromises).then(
                      function () {
                        resolve();
                      }, function () {
                        console.log("[FAIL] A file could not be read");
                        reject();
                      }
                    );
                  },
                  function (err) {
                    console.log("[FAIL] Failed to open recurs directory");
                    console.log(err);
                    error = true;
                    reject();
                  }
                );
              });
            }

            $window.resolveLocalFileSystemURL(
              self.getPath(),
              function (directoryEntry) {
                var buildPromises = zipDir(directoryEntry, "");

                buildPromises.then(
                  function () {
                    for (var i in promises) {
                      promises[i].then(function (result) {
                        console.log(result.filePath + result.fileName);
                        zip.file(result.filePath + result.fileName, result.content);
                      }, function (error) {
                        console.log(error);
                      })
                    }

                    Promise.all(promises).then(
                      function () {
                        $cordovaFile.writeFile(self.user.getAppsPath(), self.normalizedName + ".zip", zip.generate({type: "blob"}), true)
                          .then(
                            function (success) {
                              resolve();
                            },
                            function (error) {
                              console.log("[FAIL] Failed to final write the zip file");
                              reject();
                            }
                          );
                      },
                      function () {
                        console.log("[FAIL] Failed to read one of the file");
                        reject();
                      }
                    );
                  },
                  function () {
                    console.log("[FAIL] Failed to zip whole dir");
                    reject();
                  }
                );
              },
              function (err) {
                console.log("[FAIL] Failed to get reader for root dir");
                console.log(err);
                reject();
              }
            );
          });
        };
        App.prototype.takeOfflineAttrs = function(offlineApp) {
          this.offlineAttrs = offlineApp.offlineAttrs;
        };
        App.prototype.fetchOnlineSource = function() {
          var self = this;

          return new Promise(function(resolve, reject) {
            resolve();
          });
        };
        App.prototype.updateFromOnline = function() {
          var self = this;

          return new Promise(function(resolve, reject) {
            if (typeof self.onlineAttrs.version !== "undefined") {
              var download = false;

              self.fetchOnlineInfos().then(
                function() {
                  self.getOnlineState().then(
                    function() {
                      if (typeof self.offlineAttrs.version !== "undefined") {
                        if (parseInt(self.onlineAttrs.version) > parseInt(self.offlineAttrs.version)) {
                          download = true;
                        }
                      } else {
                        download = true;
                      }

                      if (download == true) {
                        self.fetchOnlineSource().then(
                          function () {
                            console.log("App::updateFromOnline [SUCCESS] Loaded all online resources and sources");
                            resolve();
                          },
                          function () {
                            console.log("App::updateFromOnline [FAILED] Failed to load source");
                            reject();
                          }
                        );
                      } else {
                        console.log("App::updateFromOnline [SUCCESS] Loaded all online resources");
                        resolve();
                      }
                    },
                    function() {
                      console.log("App::updateFromOnline [FAILED] Failed to load state");
                      reject();
                    }
                  );
                },
                function() {
                  console.log("App::updateFromOnline [FAILED] Failed to load infos");
                  reject();
                }
              );
            } else {
              console.log("App::updateFromOnline [SUCCESS] No online version");
              console.log(self);
              console.log(typeof self.onlineAttrs.version);
              resolve();
            }
          });
        };
        App.prototype.getPages = function() {
          var self = this;
          var re = /(?:\.([^.]+))?$/;

          return new Promise(function(resolve, reject) {
            $window.resolveLocalFileSystemURL(
              self.getPath(),
              function (directoryEntry) {
                var dirReader = directoryEntry.createReader();

                dirReader.readEntries(
                  function (entries) {
                    var promises = [];

                    for (var i in entries) {
                      if (entries[i].isFile == true) {
                        var curName = entries[i].name;
                        if (re.exec(curName)[1] == "html") {
                          promises.push(
                            new Promise(function (resolve, reject) {
                              $cordovaFile.readAsText(self.getPath(), curName).then(
                                function (result) {
                                  console.log("READ : " + result)
                                  resolve({fileName: curName, content: result});
                                },
                                function (error) {
                                  reject({fileName: curName, content: error});
                                }
                              );
                            })
                          );
                        }
                      }
                    }

                    var pages = [];

                    for (var i in promises) {
                      promises[i].then(
                        function(elt) {
                          pages.push(elt);
                        },
                        function(err) {
                          console.log("[FAIL] Could not load:");
                          console.log(err);
                        }
                      )
                    }

                    Promise.all(promises).then(
                      function() {
                        console.log("[SUCCESS] read files")
                        resolve(pages)
                      },
                      function() {
                        console.log("[FAILURE] pas read files")
                      }
                    )
                  },
                  function () {
                    console.log("[FAIL] Failed to read entries");
                    reject();
                  }
                );
              },
              function (err) {
                console.log("[FAIL] Failed to get reader for root dir");
                console.log(err);
                reject();
              }
            );
          });
        };
        App.prototype.getDOMParser = function(data) {
          var xmlDoc = null;
          var parser=new DOMParser();
          xmlDoc = parser.parseFromString(data, "text/html");
          return xmlDoc;
        };
        App.prototype.addImages = function(rootDir) {
          var self = this;

          return new Promise(function(resolve, reject) {
            $cordovaFile.createDir(rootDir, "img", true).then(
              function () {
                console.log("Created img dir");
                self.getPages().then(
                  function (pages) {
                    console.log("Got pages");
                    console.log(pages);
                    var imgId = 0;
                    var re = /(?:\.([^.]+))?$/;

                    var writePromises = [];

                    for (var pageIndex in pages) {
                      console.log("updating : " + pages[pageIndex].fileName);
                      console.log(pages[pageIndex].content);
                      var DOM = self.getDOMParser(pages[pageIndex].content);
                      console.log(DOM);

                      var imgs = DOM.getElementsByTagName("img");
                      var pagePromises = [];

                      console.log("Images");
                      console.log(imgs);

                      for (var i = 0; i < imgs.length; ++i) {
                        var url = imgs[i].attributes.src.value;

                        console.log("URL");
                        console.log(url);

                        if (!(url.indexOf('http://') === 0 || url.indexOf('https://') === 0)) {
                          var ext = re.exec(url)[1];
                          ++imgId;
                          imgs[i].attributes.src.value = "img/" + imgId + "." + ext;
                          pagePromises.push(
                            new Promise(function (resolve, reject) {
                              var fullPath = cordova.file.applicationDirectory + "/www/" + url;
                              console.log("Copying '" + fullPath + "' to '" + self.getPath() + "/img/" + imgId + "." + ext + "'");
                              console.log(fullPath);
                              $cordovaFile.copyFile(
                                fullPath.replace(/\/[^\/]+\/?$/, ''),
                                fullPath.replace(/^.*[\\\/]/, ''),
                                self.getPath() + "/img",
                                imgId + "." + ext
                              ).then(
                                resolve,
                                function() {
                                  console.log("Failed to copy '" + fullPath + "' to '" + self.getPath() + "/img/" + imgId + "." + ext + "'")
                                  console.log(arguments);
                                  reject.apply(this, arguments);
                                }
                              );
                            })
                          );
                        }
                      }

                      writePromises.push(
                        new Promise(function(resolve, reject) {
                          console.log("Promise page : " + pages[pageIndex].fileName);
                          Promise.all(pagePromises).then(
                            function () {
                              $cordovaFile.writeFile(self.getPath(), pages[pageIndex].fileName, DOM.documentElement.outerHTML, true).then(
                                function() {
                                  console.log("Wrote file");
                                  resolve.apply(this, arguments);
                                },
                                function() {
                                  console.log("Failed to write file");
                                  reject.apply(this, arguments);
                                }
                              )
                            },
                            function () {
                              console.log("Some pagePromise failed");
                              reject();
                            }
                          );
                        })
                      );
                    }

                    console.log("Promises");
                    Promise.all(writePromises).then(
                      function() {
                        console.log("End promises");
                        resolve();
                      },
                      function() {
                        console.log("Some writePromise failed");
                        reject();
                      }
                    )
                  },
                  function () {
                    console.log("Failed to get pages");
                    reject();
                  }
                )
              },
              function () {
                console.log("Failed to create img dir");
                reject();
              }
            );
          });
        };
        App.prototype.buildLocal = function() {
          var self = this;

          return new Promise(function (resolve, reject) {
            var assets = {
              "js": [
                [cordova.file.applicationDirectory + "/www/lib/jquery/", "jquery-2.0.0.min.js"],
                [cordova.file.applicationDirectory + "/www/lib/jquery/", "jquery-ui.js"],
                [cordova.file.applicationDirectory + "/www/lib/bootstrap/", "bootstrap.min.js"],
                [cordova.file.applicationDirectory + "www/lib/jquery/", "jquery.ui.touch-punch.min.js"],
                [cordova.file.applicationDirectory + "www/lib/editor/", "docs.min.js"]
              ],
              "css": [
                [cordova.file.applicationDirectory + "/www/css/", "bootstrap-combined.min.css"]
              ]
            }

            var assetDirPromises = [];

            for (var assetDir in assets) {
              assetDirPromises.push(
                new Promise(function (resolve, reject) {
                  $cordovaFile.createDir(self.getPath(), assetDir, true).then(
                    resolve,
                    reject
                  );
                })
              );
            }

            Promise.all(assetDirPromises).then(
              function () {
                var copyFilesPromises = [];

                for (var assetDir in assets) {
                  for (var asset in assets[assetDir]) {
                    copyFilesPromises.push(
                      new Promise(function (resolve, reject) {
                        var tDir = self.getPath() + "/" + assetDir;
                        var tinfos = assets[assetDir][asset];
                        console.log(tinfos[0], tinfos[1]);
                        console.log(tDir, tinfos[1]);
                        $cordovaFile.copyFile(tinfos[0], tinfos[1], tDir, tinfos[1]).then(
                          resolve,
                          reject
                        );
                        //resolve();
                      })
                    );
                  }
                }

                Promise.all(copyFilesPromises).then(
                  function () {
                    console.log("[SUCCESS] Prebuilt app");
                    self.addImages(self.getPath()).then(
                      function() {
                        console.log("[SUCCESS] Built app successfully");
                        resolve();
                      },
                      function() {
                        console.log("[FAIL] Could not add images");
                        reject();
                      }
                    )
                  },
                  function (error) {
                    console.log("[FAIL] Could not copy all files");
                    console.log(error);
                    reject();
                  }
                );
              },
              function (error) {
                console.log("[FAIL] Could not make assets directory");
                console.log(error);
                reject();
              }
            );
          });
        };

        return App;
      }
    ]
  );
