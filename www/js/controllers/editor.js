/**
 * Created by talanor on 11/25/15.
 */
angular.module('starter.controllers').controller(
  'EditorCtrl',
  [
    "$rootScope", "$scope", "$compile", "$timeout", "$window", "$ionicModal", "$ionicGesture", "$cordovaFile",
    function($rootScope, $scope, $compile, $timeout, $window, $ionicModal, $ionicGesture, $cordovaFile) {
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
        console.log("Opening EDITOR");
        $scope.currentEditor = $(event.currentTarget);
        var eText = $scope.currentEditor.html();
        $scope.CKInstance.setData(eText);
        $("#editorModal").modal({backdrop: false}).on("shown", function () {
          //$('.modal-backdrop').remove();
        });
      }

      $scope.bindSortables = function() {
        $(".demo .column").sortable({
          opacity: .35,
          connectWith: ".column",
          start: function (e, t) {
            if (!$scope.startDrag) {
              ++$scope.stopSave;
            }
            $scope.startDrag = 1;
          },
          stop: function (e, t) {
            if ($scope.stopSave > 0) {
              --$scope.stopSave;
            }
            $scope.startDrag = 0;
          }
        });
        if ($scope.stopSave > 0) {
          $scope.stopSave;
        }
        $scope.startDrag = 0;
      }

      $scope.bindEditors = function() {
        console.log("Binding EDITORS");
        var editorElts = document.getElementsByClassName("editor-element");

        console.log(editorElts);
        for (var i = 0 ; i < editorElts.length ; ++i) {
          var elt = angular.element(editorElts[i]);
          $ionicGesture.on(
            "doubletap",
            function(event) {
              $scope.openEditor(event);
            },
            elt
          );
        }
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
          console.log($rootScope.currentApp.getPath());
          $cordovaFile.writeFile($rootScope.currentApp.getPath(), $scope.currentPage + ".html", $scope.getLayoutHTML(), true).then(
            function () {
              console.log("[SUCCESS] Wrote file: " + $scope.currentPage + ".html");
              resolve();
            },
            function () {
              console.log("[FAIL] Could not create file: " + $scope.currentPage + ".html");
              reject();
            }
          );
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

      $scope.loadPageContent = function(pageName) {
        return new Promise(function(resolve, reject) {
          $cordovaFile.readAsText($rootScope.currentApp.getPath(), pageName + ".html").then(
            function(content) {
              resolve(content);
            },
            function() {
              console.log("[FAIL] Could not read : '" + pageName + ".html" + "'");
              reject();
            }
          )
        });
      }

      $scope.fillCurrentPage = function(html) {
        console.log("Filling page");

        //console.log(html);

        var content = angular.element(html);

        console.log(content);

        var container = null;

        for (var i = 0 ; i < content.length ; ++i) {
          if (content[i].className == "container-fluid") {
            container = content[i];
            break;
          }
        }

        console.log(container);

        if (container != null) {
          for (var i = 0; i < container.childNodes.length; ++i) {
            var row = container.childNodes[i];

            if (row.nodeType == Node.ELEMENT_NODE) {
              var tmpRow =
                '<div class="lyrow ui-draggable">\
                  <a href="#close" class="remove label label-danger">\
                    <i class="icon ion-close"></i>\
                  </a>\
                  <span class="drag label">\
                    <i class="icon ion-arrow-move"></i>\
                  </span>\
                  <div class="view">\
                    <div class="row-fluid clearfix">';

              console.log(row);
              var elt = angular.element(row);

              console.log(elt);
              var columns = elt.find("div");
              for (var j = 0 ; j < columns.length ; ++j) {
                var column = columns[j];
                var cls = column.className;

                console.log(column);
                console.log(cls);

                if (cls) {
                  if (cls.search(/span([0-9]+)/) >= 0) {
                    tmpRow +=
                      '<div class="' + cls + ' column ui-sortable">';
                    for (var k = 0 ; k < column.childNodes.length ; ++k) {
                      var child = column.childNodes[k];

                      if (child.nodeType == Node.ELEMENT_NODE) {
                        tmpRow +=
                          '<div class="box box-element ui-draggable">\
                            <a href="#close" class="remove label label-danger">\
                              <i class="icon ion-close"></i>\
                            </a>\
                            <div class="view">';

                        tmpRow += child.outerHTML;

                        tmpRow +=
                          ' </div>\
                          </div>';
                      } else if (child.nodeType == Node.TEXT_NODE) {
                        tmpRow += child.data;
                      }
                    }
                    tmpRow +=
                      '</div>';
                  }
                }
              }
              tmpRow +=
                "   </div>\
                  </div>\
                </div>";
              row.outerHTML = tmpRow;
            }
          }
        }
        console.log(container);
        $(".demo").html(
          container.innerHTML
        );
        $compile($(".demo")[0])($scope);
      }

      $scope.loadPage = function(pageName) {
        return new Promise(function(resolve, reject) {
          $scope.loadPageContent(pageName).then(
            function (content) {
              $scope.emptyCurrentPage();
              $scope.fillCurrentPage(content);
              resolve();
            },
            function () {
              console.log("[FAIL] Could not load page '" + pageName + "'");
              reject();
            }
          );
        });
      }

      $scope.changePage = function(pageName) {
        return new Promise(function(resolve, reject) {
          $scope.saveCurrentPage().then(
            function() {
              $scope.loadPage(pageName).then(
                function() {
                  resolve();
                },
                function() {
                  reject();
                }
              );
            },
            function() {
              console.log("[FAIL] Could not save current page");
              reject();
            }
          )
        });
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

        function initPage() {
          $scope.bindEditors();
          $scope.bindSortables();

          $window.CKEDITOR.disableAutoInline = true;
          $scope.CKInstance = $window.CKEDITOR.replace(
            'contenteditor', {
              language: 'en',
              contentsCss: ['css/bootstrap-combined.min.css'],
              allowedContent: true
            }
          );
          cyan.initEditor($window, cordova, JSZip, $cordovaFile, window.FileTransfer, $ionicGesture, cordova.file.externalDataDirectory);
        }

        $scope.loadPage($scope.currentPage).then(
          initPage,
          initPage
        );
      });

      $scope.$on("$ionicView.afterLeave", function() {
        console.log("EditorCtrl::afterEnter");
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

                scope.bindEditors();

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
                scope.bindSortables();
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
  .directive(
    'editorLoadPage',
    [
      "$ionicGesture",
      function($ionicGesture) {
        return {
          link: function(scope, element, attrs) {
            $ionicGesture.on(
              "click",
              function(event) {
                console.log("Directive::editorLoadPage");
                var pageName = prompt("Enter page name", "");

                if (pageName) {
                  scope.changePage(pageName).then(
                    function () {

                    },
                    function () {
                      console.log("[FAIL] Could not load page '" + pageName + "'");
                    }
                  )
                }
              },
              element
            );
          }
        };
      }
    ]
  )
