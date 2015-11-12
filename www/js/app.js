// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('cyan', {
    url: '/cyan',
    abstract: true,
    templateUrl: 'templates/Cyan/menu.html',
    //controller: 'CyanCtrl'
  })

  .state('cyan.signein', {
    url: '/signein',
    views: {
      'menuContent': {
        templateUrl: 'templates/Cyan/login.html',
        controller: 'CyanCtrl'
      }
    }
  })

  .state('cyan.main-logged-panel', {
    url: '/main-logged-panel',
    views: {
      'menuContent': {
        templateUrl: 'templates/Cyan/main-logged.html',
        controller: 'CyanCtrl'
      }
    }
  })

  .state('cyan.editor-panel', {
      url: '/editor-panel',
      views: {
        'menuContent': {
          templateUrl: 'templates/Cyan/editor.html',
          controller: 'EditorCtrl'
        }
      }
    })

    .state('cyan.create-app', {
      url: '/create-app',
      views: {
        'menuContent': {
          templateUrl: 'templates/Cyan/create-App.html',
          controller: 'CyanCtrl'
        }
      }
    })

 .state('cyan.list-apps-panel', {
      url: '/list-apps-panel',
      views: {
        'menuContent': {
          templateUrl: 'templates/Cyan/list-App.html',
          controller: 'CyanCtrl'
        }
      }
    })
  .state('cyan.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })

    .state('cyan.credentials-retrieval-panel', {
      url: '/credentials-retrieval-panel',
      views: {
        'menuContent': {
          templateUrl: 'templates/cyan/credentials-retrieval.html',
          controller: 'CyanCtrl'
        }
      }
    })

  .state('cyan.signup-panel', {
    url: '/signup-panel',
    views: {
      'menuContent': {
        templateUrl: 'templates/cyan/SignUp.html',
        controller: 'CyanCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/cyan/signein');
});
