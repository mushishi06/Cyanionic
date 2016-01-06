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
        timeout: 50000,
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
        },
        getAppInfos: function(username, password, appname) {
          var self = this;

          return new Promise(
            function(resolve, reject) {
              console.log("[API] [POST] /api/get_app_infos");
              $http({
                url: self.getUrl("/api/get_app_infos"),
                method: "POST",
                data: {
                  username: username,
                  password: password,
                  name: appname
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
        sendApp: function(username, password, appname, filePath) {
          var self = this;
          return new Promise(function(resolve, reject) {
            var options = new FileUploadOptions();

            options.fileKey = "app";
            options.fileName = appname + ".zip";
            options.mimeType = "application/zip";

            var params = {};
            params.username = username;
            params.password = password;
            params.name = appname;

            options.params = params;

            var ft = new FileTransfer();
            var uploaded = ft.upload(
              filePath,
              encodeURI(self.scheme + "://" + self.host + ":" + self.port + "/api/send_app"),
              function () {
                console.log("Upload succeeded");
                resolve();
              },
              function () {
                console.log("Upload failed");
                reject();
              },
              options,
              true
            );
          });
        },
        compileApp: function(username, password, appname, platforms) {
          var self = this;

          return new Promise(
            function(resolve, reject) {
              console.log("[API] [POST] /api/compile_app");
              $http({
                url: self.getUrl("/api/compile_app"),
                method: "POST",
                data: {
                  username: username,
                  password: password,
                  name: appname,
                  platforms: platforms
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
        publishApp: function(username, password, appname, platforms) {
          var self = this;

          return new Promise(
            function(resolve, reject) {
              console.log("[API] [POST] /api/publish_app");
              $http({
                url: self.getUrl("/api/publish_app"),
                method: "POST",
                data: {
                  username: username,
                  password: password,
                  name: appname,
                  platforms: platforms
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
        getAppState: function(username, password, appname) {
          var self = this;

          return new Promise(
            function(resolve, reject) {
              console.log("[API] [POST] /api/get_app_state");
              $http({
                url: self.getUrl("/api/get_app_state"),
                method: "POST",
                data: {
                  username: username,
                  password: password,
                  name: appname
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
        deleteApp: function(username, password, appname) {
          var self = this;

          return new Promise(
            function(resolve, reject) {
              console.log("[API] [POST] /api/delete_app");
              $http({
                url: self.getUrl("/api/delete_app"),
                method: "POST",
                data: {
                  username: username,
                  password: password,
                  name: appname
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
        fetchApp: function(username, password, appname) {
          //var fileTransfer = new FileTransfer();
          //var uri = encodeURI("http://some.server.com/download.php");
          //
          //fileTransfer.download(
          //  uri,
          //  fileURL,
          //  function(entry) {
          //    console.log("download complete: " + entry.toURL());
          //  },
          //  function(error) {
          //    console.log("download error source " + error.source);
          //    console.log("download error target " + error.target);
          //    console.log("upload error code" + error.code);
          //  },
          //  false,
          //  {
          //    headers: {
          //      "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
          //    }
          //  }
          //);
        }
      }
    }
  ]
);
