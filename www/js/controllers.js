angular.module('starter.controllers', [])

.controller('CyanCtrl', function($scope, $ionicModal, $timeout, $state) {
    $scope.$on('$ionicView.afterEnter', function () {
      console.log("CyanCtrl::afterEnter");
      var links = document.getElementsByClassName("docs-css");
      for (var i = 0 ; i < links.length ; ++i) {
        angular.element(links[i]).remove();
      }

      var head = angular.element(document.getElementsByTagName("head")[0]);

      links = document.getElementsByClassName("ionic-css");
      if (links.length == 0) {
        head.append(angular.element('<link href="lib/ionic/css/ionic.css" class="ionic-css" rel="stylesheet" />'));
      }
    });

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    loadPage('cyan.browse');
    // $scope.modal.hide();
  };

  loadPageControler = function(page)
  {
      $state.go(page);
  }

  // Open the login modal
  // $scope.login = function() {
  //   $scope.modal.show();
  // };

  // Perform the login action when the user submits the login form
  $scope.userIdentification = function() {
    console.log('Doing login', $scope.loginData);
    cyan.userIdentification($scope.loginData.username ,$scope.loginData.password);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    // $timeout(function() {
    //    $scope.closeLogin();
    // }, 1000);
  };


})
.controller(
  'EditorCtrl',
  [
    "$scope", "$window", "$ionicModal", "$ionicGesture", "$cordovaFile",
    function($scope, $window, $ionicModal, $ionicGesture, $cordovaFile) {
      $scope.appName = "testapp";

      $scope.rootPath = cordova.file.externalDataDirectory;
      $scope.appPath = $scope.rootPath + "/" + $scope.appName;

      $scope.assets = {
        "js": [
          ["www/lib/", "jquery/", "jquery-2.0.0.min.js"],
          ["www/lib/", "jquery/", "jquery-ui.js"],
          ["www/lib/", "bootstrap/", "bootstrap.min.js"],
        ],
        "css": [
          ["www/css/", "", "bootstrap-combined.min.css"]
        ]
      };

      $scope.currentEditor = null;
      $scope.CKInstance = null;

      $scope.currentPage = 'index';

      $scope.stopSave = 0;
      $scope.startDrag = 0;

      $scope.openEditor = function(event) {
        $scope.currentEditor = $(event.currentTarget);
        var eText = $scope.currentEditor.html();
        $scope.CKInstance.setData(eText);
        $("#editorModal").modal({backdrop: false}).on("shown", function () {
          //$('.modal-backdrop').remove();
        });
      }

      $scope.cleanHTML = function(e) {
        $(e).parent().append($(e).children().html())
        $(e).remove();
      }

      $scope.changeStructure = function(e, t) {
        $("#download-layout ." + e).removeClass(e).addClass(t)
      }

      $scope.getLayoutBodyContent = function() {
        var e = "";
        $("#download-layout").children().html($(".demo").html());
        var t = $("#download-layout").children();
        t.find(".preview, .configuration, .drag, .remove").remove();
        t.find(".lyrow").addClass("removeClean");
        t.find(".box-element").addClass("removeClean");
        t.find(".lyrow .lyrow .lyrow .lyrow .lyrow .removeClean").each(function () {
          $scope.cleanHTML(this)
        });
        t.find(".lyrow .lyrow .lyrow .lyrow .removeClean").each(function () {
          $scope.cleanHTML(this)
        });
        t.find(".lyrow .lyrow .lyrow .removeClean").each(function () {
          $scope.cleanHTML(this)
        });
        t.find(".lyrow .lyrow .removeClean").each(function () {
          $scope.cleanHTML(this)
        });
        t.find(".lyrow .removeClean").each(function () {
          $scope.cleanHTML(this)
        });
        t.find(".removeClean").each(function () {
          $scope.cleanHTML(this)
        });
        t.find(".removeClean").remove();
        $("#download-layout .column").removeClass("ui-sortable");
        $("#download-layout .row-fluid").removeClass("clearfix").children().removeClass("column");
        if ($("#download-layout .container").length > 0) {
          $scope.changeStructure("row-fluid", "row")
        }
        var formatSrc = $.htmlClean($("#download-layout").html(), {
          format: true,
          allowedAttributes: [
            ["id"],
            ["class"],
            ["data-toggle"],
            ["data-target"],
            ["data-parent"],
            ["role"],
            ["data-dismiss"],
            ["aria-labelledby"],
            ["aria-hidden"],
            ["data-slide-to"],
            ["data-slide"]
          ]
        });
        $("#download-layout").html(formatSrc);
        $("#downloadModal textarea").empty();
        $("#downloadModal textarea").val(formatSrc);
        return formatSrc;
      }

      $scope.getLayoutHTML = function() {
        var html =
          "<html>\n\
            <head>\n\
              ";

        for (i in $scope.assets["js"]) {
          html += '<script type="text/javascript" src="js/' + $scope.assets["js"][i][1] + $scope.assets["js"][i][2] + '"></script>\n';
        }
        for (i in $scope.assets["css"]) {
          html += '<link media="screen" rel="stylesheet" href="css/' + $scope.assets["css"][i][1] + $scope.assets["css"][i][2] + '">\n';
        }
        html +=
          "</head>\n\
            <body>\n\
            " + $scope.getLayoutBodyContent() + "\n\
            </body>\n\
          </html>";
        return html;
      }

      $scope.saveCurrentPage = function() {
        return new Promise(function(resolve, reject) {
          var mkDirPromise = $cordovaFile.createDir($scope.rootPath, $scope.appName, true);

          mkDirPromise.then(
            function () {
              var appDirPath = cordova.file.externalDataDirectory + "/" + $scope.appName;
              $cordovaFile.writeFile(appDirPath, $scope.currentPage + ".html", $scope.getLayoutHTML(), true).then(
                function () {
                  console.log("[SUCCESS] Wrote file: " + $scope.currentPage + ".html");
                  resolve();
                },
                function () {
                  console.log("[FAIL] Could not create file: " + $scope.currentPage + ".html");
                  reject();
                }
              );
            },
            function () {
              console.log("[FAIL] Failed to create app directory");
              reject();
            }
          )
        });
      }

      $scope.setCurrentPageName = function(pageName) {
        $scope.currentPage = pageName;
      }

      $scope.getNewPageName = function() {
        var pageName = "";

        while (true) {
          pageName = prompt("Enter a name for the page", "");
          if (pageName && pageName.length > 2) {
            break;
          }
        }
        return pageName;
      }

      $scope.emptyCurrentPage = function() {
        $(".demo").empty();
      }

      $scope.$on('$ionicView.afterEnter', function () {
        console.log("EditorCtrl::afterEnter");
        var links = document.getElementsByClassName("ionic-css");
        for (var i = 0 ; i < links.length ; ++i) {
          angular.element(links[i]).remove();
        }

        var head = angular.element(document.getElementsByTagName("head")[0]);

        links = document.getElementsByClassName("docs-css");
        if (links.length == 0) {
          head.append(angular.element('<link href="css/editor-css/docs.min.css" class="docs-css" rel="stylesheet" />'));
        }

        $window.CKEDITOR.disableAutoInline = true;
        $scope.CKInstance = $window.CKEDITOR.replace(
          'contenteditor', {
            language: 'en',
            contentsCss: ['css/bootstrap-combined.min.css'],
            allowedContent: true
          }
        );

        cyan.initEditor($window, cordova, JSZip, $cordovaFile, window.FileTransfer, $ionicGesture, cordova.file.externalDataDirectory);
      });
  }]
)
  .directive(
    'editorBox',
    [
      "$ionicGesture",
      function($ionicGesture) {
        return {
          link: function(scope, element, attrs) {
            $(element).draggable({
              connectToSortable: ".column",
              helper: "clone",
              start: function (e, t) {
                if (!scope.startDrag) {
                  ++scope.stopSave;
                }
                scope.startDrag = 1;
              },
              drag: function (e, t) {
                t.helper.width(400)
              },
              stop: function (event, ui) {
                //handleJsIds();
                if (scope.stopSave > 0) {
                  --scope.stopSave;
                }

                var editorElts = document.getElementsByClassName("editor-element");

                for (var i = 0 ; i < editorElts.length ; ++i) {
                  var elt = angular.element(editorElts[i]);
                  $ionicGesture.on(
                    "doubletap",
                    function(event) {
                      scope.openEditor(event);
                    },
                    elt
                  );
                }
                scope.startDrag = 0;
              }
            });
          }
        };
      }
    ]
  )
  .directive(
    'editorRow',
    [
      function() {
        return {
          link: function(scope, element, attrs) {
            $(element).draggable({
              connectToSortable: ".demo",
              helper: "clone",
              cancel: "input",
              start: function (e, t) {
                if (!scope.startDrag) {
                  ++scope.stopSave;
                }
                scope.startDrag = 1;
              },
              drag: function (e, t) {
                //t.helper.width(400)
              },
              stop: function (e, t) {
                $(".demo .column").sortable({
                  opacity: .35,
                  connectWith: ".column",
                  start: function (e, t) {
                    if (!scope.startDrag) {
                      ++scope.stopSave;
                    }
                    scope.startDrag = 1;
                  },
                  stop: function (e, t) {
                    if (scope.stopSave > 0) {
                      --scope.stopSave;
                    }
                    scope.startDrag = 0;
                  }
                });
                if (scope.stopSave > 0) {
                  scope.stopSave;
                }
                scope.startDrag = 0;
              }
            });
          }
        }
      }
    ]
  )
  .directive(
    'editorModalContentSave',
    [
      "$ionicGesture",
      function($ionicGesture) {
        return {
          link: function(scope, element, attrs) {
            $ionicGesture.on(
              "click",
              function(event) {
                scope.currentEditor.html(scope.CKInstance.getData());
              },
              element
            );
          }
        };
      }
    ]
  )
  .directive(
    'editorSavePage',
    [
      "$ionicGesture",
      function($ionicGesture) {
        return {
          link: function(scope, element, attrs) {
            $ionicGesture.on(
              "click",
              function(event) {
                console.log("Directive::editorSavePage");
                scope.saveCurrentPage();
              },
              element
            );
          }
        };
      }
    ]
  )
  .directive(
    'editorAddPage',
    [
      "$ionicGesture",
      function($ionicGesture) {
        return {
          link: function(scope, element, attrs) {
            $ionicGesture.on(
              "click",
              function(event) {
                console.log("Directive::editorAddPage");
                var pageName = scope.getNewPageName();

                scope.saveCurrentPage().then(
                  function() {
                    scope.setCurrentPageName(pageName);
                    scope.emptyCurrentPage();
                  },
                  function() {
                    console.log("[FAIL] Could not save current page");
                  }
                );
              },
              element
            );
          }
        };
      }
    ]
  )
.controller('VoidCtrl', function($scope, $ionicModal, $timeout, $state) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    // $ionicModal.fromTemplateUrl('templates/login.html', {
    //   scope: $scope
    // }).then(function(modal) {
    //   $scope.modal = modal;
    // });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      loadPage('cyan.browse');
      // $scope.modal.hide();
    };

    loadPageControler = function(page)
    {
      $state.go(page);
    }

    // Open the login modal
    // $scope.login = function() {
    //   $scope.modal.show();
    // };

    // Perform the login action when the user submits the login form
    $scope.userIdentification = function() {
      console.log('Doing login', $scope.loginData);
      cyan.userIdentification($scope.loginData.username ,$scope.loginData.password);
      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      // $timeout(function() {
      //    $scope.closeLogin();
      // }, 1000);
    };
  });
