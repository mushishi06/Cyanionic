// Ionic Starter App

angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])
  .config(
    function($stateProvider, $ionicConfigProvider, $urlRouterProvider) {
      $ionicConfigProvider.views.maxCache(0);

      $stateProvider
      .state(
        'cyan',
        {
          url: '/cyan',
          abstract: true,
          templateUrl: 'templates/Cyan/menu.html',
          controller: 'VoidCtrl'
        }
      )
      .state(
        'cyan.signein',
        {
          url: '/signein',
          views: {
            'menuContent': {
              templateUrl: 'templates/Cyan/login.html',
              controller: 'CyanCtrl'
            }
          }
        }
      )
      .state(
        'cyan.main-logged-panel',
        {
          url: '/main-logged-panel',
          views: {
            'menuContent': {
              templateUrl: 'templates/Cyan/main-logged.html',
              controller: 'CyanCtrl'
            }
          }
        }
      )
      .state(
        'editor-panel',
        {
          url: '/editor-panel',
          templateUrl: 'templates/Cyan/editor.html',
          controller: 'EditorCtrl'
        }
      )
      .state(
        'cyan.create-app',
        {
          url: '/create-app',
          views: {
            'menuContent': {
              templateUrl: 'templates/Cyan/create-App.html',
              controller: 'CyanCtrl'
            }
          }
        }
      )
      .state(
        'cyan.list-apps-panel',
        {
          url: '/list-apps-panel',
          views: {
            'menuContent': {
              templateUrl: 'templates/Cyan/list-App.html',
              controller: 'ListAppsCtrl'
            }
          }
        }
      )
      .state(
        'cyan.browse',
        {
          url: '/browse',
          views: {
            'menuContent': {
              templateUrl: 'templates/browse.html'
            }
          }
        }
      )
      .state(
        'cyan.credentials-retrieval-panel',
        {
          url: '/credentials-retrieval-panel',
          views: {
            'menuContent': {
              templateUrl: 'templates/cyan/credentials-retrieval.html',
              controller: 'CyanCtrl'
            }
          }
        }
      )
      .state(
        'cyan.signup-panel',
        {
          url: '/signup-panel',
          views: {
            'menuContent': {
              templateUrl: 'templates/cyan/SignUp.html',
              controller: 'CyanCtrl'
            }
          }
        }
      );
      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/cyan/signein');
    }
  )
  .run(
    [
      '$ionicPlatform',
      function($ionicPlatform) {
        $ionicPlatform.ready(
          function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.StatusBar) {
              // org.apache.cordova.statusbar required
              StatusBar.styleDefault();
            }
          }
        );
      }
    ]
  )
  .factory(
    "cyanAPI",
    [
      '$http',
      function($http) {
        return {
          scheme: "http",
          host: "cyandev.xyz",
          port: 5555,
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
                  }
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
