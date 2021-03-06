// Ionic Starter App

angular.module(
  'starter',
  ['ionic', 'starter.controllers', 'ngCordova', 'door3.css', 'angularLoad']
)
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
          controller: 'VoidCtrl',
        }
      )
      .state(
        'cyan.signein',
        {
          url: '/signein',
          views: {
            'menuContent': {
              templateUrl: 'templates/Cyan/login.html',
              controller: 'LoginCtrl',
            }
          },
          css: [
            {
              href: "lib/ionic/css/ionic.css",
              preload: true
            },
            {
              href: "lib/Ionicons/css/ionicons.css",
              preload: true
            },
            {
              href: "css/style.css",
              preload: true
            },
            {
              href: "css/login.css",
              preload: true
            }
          ]
        }
      )
      .state(
        'cyan.main-logged-panel',
        {
          url: '/main-logged-panel',
          views: {
            'menuContent': {
              templateUrl: 'templates/Cyan/main-logged.html',
              controller: 'VoidCtrl'
            }
          },
          css: [
            {
              href: "lib/ionic/css/ionic.css",
              preload: true
            },
            {
              href: "lib/Ionicons/css/ionicons.css",
              preload: true
            },
            {
              href: "css/style.css",
              preload: true
            },
            {
              href: "css/login.css",
              preload: true
            }
          ]
        }
      )
      .state(
        'editor-panel',
        {
          url: '/editor-panel',
          templateUrl: 'templates/Cyan/editor.html',
          controller: 'EditorCtrl',
          css: [
            {
              href: 'css/editor-css/docs.min.css',
              preload: true
            },
            {
              href: "lib/Ionicons/css/ionicons.css",
              preload: true
            },
            {
              href: 'css/editor-css/layoutit.css',
              preload: true
            },
            {
              href: 'css/bootstrap-combined.min.css',
              preload: true
            },
            {
              href: 'lib/editor/slidepanel.css',
              preload: true
            }
          ]
        }
      )
      .state(
        'cyan.create-app',
        {
          url: '/create-app',
          views: {
            'menuContent': {
              templateUrl: 'templates/Cyan/create-App.html',
              controller: 'CreateAppCtrl'
            }
          },
          css: [
            {
              href: "lib/ionic/css/ionic.css",
              preload: true
            },
            {
              href: "lib/Ionicons/css/ionicons.css",
              preload: true
            },
            {
              href: "css/style.css",
              preload: true
            },
            {
              href: "css/login.css",
              preload: true
            }
          ]
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
          },
          css: [
            {
              href: "lib/ionic/css/ionic.css",
              preload: true
            },
            {
              href: "lib/Ionicons/css/ionicons.css",
              preload: true
            },
            {
              href: "css/style.css",
              preload: true
            },
            {
              href: "css/login.css",
              preload: true
            }
          ]
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
              controller: 'LoginCtrl'
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
              controller: 'LoginCtrl'
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
      '$ionicPlatform', '$rootScope', 'LocalStorage',
      function($ionicPlatform, $rootScope, LocalStorage) {
        $ionicPlatform.ready(
          function() {
            $rootScope.currentUser = null;
            $rootScope.localStorage = new LocalStorage();

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)

            if (window.cordova) {
              if (window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
              }
              $rootScope.rootPath = window.cordova.file.externalDataDirectory;
            }

            if (window.StatusBar) {
              // org.apache.cordova.statusbar required
              StatusBar.styleDefault();
            }
          }
        );
      }
    ]
  );
