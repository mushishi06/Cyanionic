/**
 * Created by talanor on 11/25/15.
 */
angular.module('starter.controllers').controller(
  'EditorCtrl',
  [
    "$rootScope", "$scope", "$compile", "$timeout", "$window", "$ionicModal", "$ionicGesture", "$cordovaFile", "$css", "angularLoad",
    function($rootScope, $scope, $compile, $timeout, $window, $ionicModal, $ionicGesture, $cordovaFile, $css, angularLoad) {
      $scope.assets = {
        "js": [
          ["www/lib/jquery/", "", "jquery-2.0.0.min.js"],
          ["www/lib/jquery/", "", "jquery-ui.js"],
          ["www/lib/bootstrap/", "", "bootstrap.min.js"],
          ["www/lib/jquery/", "", "jquery.ui.touch-punch.min.js"],
          ["www/lib/editor/", "", "docs.min.js"]
        ],
        "css": [
          ["www/css/", "", "bootstrap-combined.min.css"]
        ]
      };

      $scope.currentEditor = null;
      $scope.CKInstances = [];

      $scope.currentPage = 'index';

      $scope.layoutHistory = {
        count: 0,
        list: []
      };
      $scope.lastLayout = null;

      $scope.stopSave = 0;
      $scope.startDrag = 0;

      $scope.timerSaveLayout = 1000;

      function loadPlugins() {
        var pluginsPath = cordova.file.applicationDirectory + "/www/lib/editor/editor-plugins";

        return new Promise(function(resolve, reject) {
          $window.resolveLocalFileSystemURL(
            pluginsPath,
            function (directoryEntry) {
              var dirReader = directoryEntry.createReader();

              dirReader.readEntries(
                function (entries) {
                  var pluginPromises = [];

                  for (var i in entries) {
                    pluginPromises.push(
                      new Promise(function (resolve, reject) {
                        angularLoad.loadScript("lib/editor/editor-plugins/" + entries[i].name).then(
                          function () {
                            console.log("[SUCCESS] Loaded plugin '" + entries[i].name + "'");
                            resolve();
                          },
                          function () {
                            console.log("[FAILURE] Failed to load plugin '" + entries[i].name + "'");
                            reject();
                          }
                        );
                      })
                    );
                  }

                  Promise.all(pluginPromises).then(
                    function () {
                      console.log("[SUCCESS] Plugins loaded");
                      resolve();
                    },
                    function () {
                      // failed to open a plugin
                      console.log("[FAILURE] Failed to open a plugin");
                      reject();
                    }
                  )
                },
                function () {
                  // Failed to open dir
                  console.log("[FAILURE] Failed to get reader");
                  reject();
                }
              )
            },
            function() {
              console.log("[FAILURE] Failed to resolve FS");
              reject();
            }
          );
        });
      }

      $scope.plugins = {
        basics: []
      };

      loadPlugins().then(
        function() {

          $scope.$apply(function() {
            $scope.plugins.basics = EditorPlugin.basics;
            $scope.plugins.page = EditorPlugin.page;
            $scope.plugins.interact = EditorPlugin.interact;
          });
          console.log("PLUGINS FULLY LOADED");
          console.log($scope.plugins);
        },
        function() {
          console.log("PLUGINS NOT FULLY LOADED");
        }
      )

      function toggleOverPanel() {
        $('.cd-menu-icon').toggleClass('is-clicked');
        $('.cd-header').toggleClass('menu-is-open');

        //in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
        if( $('.cd-primary-nav').hasClass('is-visible') ) {
          $('.cd-primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
            $('body').removeClass('overflow-hidden');
          });
        } else {
          $('.cd-primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
            $('body').addClass('overflow-hidden');
          });
        }
      }

      $scope.openEditor = function(event) {
        $scope.CKInstances = []
        $(".cd-elt").remove();
        console.log("Opening EDITOR");

        console.log($scope.plugins);
        $scope.currentEditor = event.currentTarget;

        $scope.currentPlugin = EditorPlugin.findPlugin($scope.currentEditor);
        console.log("PLUGIN USED: ");
        console.log($scope.currentPlugin);

        if ($scope.currentPlugin != null) {
          var elts = $scope.currentPlugin.getElts($scope.currentEditor);

          for (var i in elts) {
            var elt = elts[i];
            var domElt = null;

            console.log(elt);

            if (elt.tag == "input") {
              domElt = $('<input type="text" />');
              domElt.attr("name", elt.key);
            } else if (elt.tag == "ckeditor") {
              domElt = $('<textarea id="contenteditor-' + i + '"></textarea>');
              domElt.attr("name", elt.key);
            }
            if (domElt != null) {
              var div = $('<div class="cd-elt"></div>');
              domElt.appendTo(div);
              div.insertBefore($(".cd-footer"));

              if (elt.tag == "input") {
                domElt.val(elt.value);
              } else if (elt.tag == "ckeditor") {
                if (elt.tag == "ckeditor") {
                  $scope.CKInstances[i] = $window.CKEDITOR.replace(
                    'contenteditor-' + i, {
                      language: 'en',
                      contentsCss: ['css/bootstrap-combined.min.css'],
                      allowedContent: true
                    }
                  );
                  $scope.CKInstances[i].setData(elt.value);
                }
              }
            }
          }

          toggleOverPanel();
        }
      }

      $scope.saveEditor = function() {
        //$scope.currentEditor.html();
        var divs = $(".cd-elt");
        for (var i = 0 ; i < divs.length ; ++i) {
          console.log($(divs[i]));
          var elt = $(divs[i]).children().first();
          console.log(elt);
          var val = null;
          var name = elt.attr("name");

          if (elt.prop("tagName") == "INPUT") {
            val = elt.val();
          } else if (typeof $scope.CKInstances[i] != "undefined") {
            val = $scope.CKInstances[i].getData();
            name = $('#contenteditor-' + i).attr("name");
          }
          $scope.currentPlugin.setData($scope.currentEditor, name, val);
        }
        toggleOverPanel();
      }

      $scope.clearLayout = function() {
        $(".demo").empty();
        $scope.layoutHistory = {
          count: 0,
          list: []
        };
        $rootScope.localStorage.remove("layoutdata");
      }

      function randomFromInterval(e, t) {
        return Math.floor(Math.random() * (t - e + 1) + e);
      }

      function randomNumber() {
        return randomFromInterval(1, 1e6);
      }

      function handleAccordionIds() {
        var e = $(".demo #myAccordion");
        var t = randomNumber();
        var n = "accordion-" + t;
        var r;
        e.attr("id", n);
        e.find(".accordion-group").each(function (e, t) {
          r = "accordion-element-" + randomNumber();
          $(t).find(".accordion-toggle").each(function (e, t) {
            $(t).attr("data-parent", "#" + n);
            $(t).attr("href", "#" + r)
          });
          $(t).find(".accordion-body").each(function (e, t) {
            $(t).attr("id", r)
          })
        })
      }

      function handleCarouselIds() {
        var elts = $(".carousel");

        for (var i = 0 ; i < elts.length ; ++i) {
          var e = $(elts.get(i));
          var t = randomNumber();
          var n = "carousel-" + t;
          e.attr("id", n);
          e.find(".carousel-indicators li").each(function (e, t) {
            $(t).attr("data-target", "#" + n)
          });
          e.find(".left").attr("href", "#" + n);
          e.find(".right").attr("href", "#" + n)
        }
      }

      function handleModalIds() {
        var e = $(".demo #myModalLink");
        var t = randomNumber();
        var n = "modal-container-" + t;
        var r = "modal-" + t;
        e.attr("id", r);
        e.attr("href", "#" + n);
        e.next().attr("id", n)
      }

      function handleTabsIds() {
        var e = $(".demo #myTabs");
        var t = randomNumber();
        var n = "tabs-" + t;
        e.attr("id", n);
        e.find(".tab-pane").each(function (e, t) {
          var n = $(t).attr("id");
          var r = "panel-" + randomNumber();
          $(t).attr("id", r);
          $(t).parent().parent().find("a[href=#" + n + "]").attr("href", "#" + r)
        })
      }

      $scope.handleJsIds = function() {
        handleModalIds();
        handleAccordionIds();
        handleCarouselIds();
        handleTabsIds()
      }

      function saveLayout() {
        if ($scope.layoutHistory.list.length > $scope.layoutHistory.count) {
          for (var i = $scope.layoutHistory.count; i < $scope.layoutHistory.list.length; i++)
            $scope.layoutHistory.list[i] = null;
        }
        $scope.layoutHistory.list[$scope.layoutHistory.count] = $scope.lastLayout;
        $scope.layoutHistory.count++;
        $rootScope.localStorage.set("layoutdata", JSON.stringify($scope.layoutHistory));
      }

      $scope.handleSaveLayout = function() {
        var e = $(".demo").html();
        if (!$scope.stopSave && e != $scope.lastLayout) {
          $scope.stopSave++;
          $scope.lastLayout = e;
          saveLayout();
          $scope.stopSave--;
        }
      };

      $scope.undoLayout = function() {
        var ret = false;

        if ($scope.layoutHistory) {
          if ($scope.layoutHistory.count >= 2) {
            window.demoHtml = $scope.layoutHistory.list[$scope.layoutHistory.count - 2];
            $scope.layoutHistory.count--;
            $('.demo').html($scope.lastLayout);
            $rootScope.localStorage.set("layoutdata", JSON.stringify($scope.layoutHistory));
            ret = true;;
          }
        }
        return ret;
      };

      $scope.redoLayout = function() {
        var ret = false;
        if ($scope.layoutHistory) {
          if ($scope.layoutHistory.list[$scope.layoutHistory.count]) {
            window.demoHtml = $scope.layoutHistory.list[$scope.layoutHistory.count];
            $scope.layoutHistory.count++;
            $('.demo').html($scope.lastLayout);
            $rootScope.localStorage.set("layoutdata", JSON.stringify($scope.layoutHistory));
            ret = true;
          }
        }
        return ret;
      };

      function configurationElm() {
        $(".demo").delegate(".configuration > a", "click", function (e) {
          e.preventDefault();
          var t = $(this).parent().next().next().children();
          $(this).toggleClass("active");
          t.toggleClass($(this).attr("rel"))
        });
        $(".demo").delegate(".configuration .dropdown-menu a", "click", function (e) {
          e.preventDefault();
          var t = $(this).parent().parent();
          var n = t.parent().parent().next().next().children();
          t.find("li").removeClass("active");
          $(this).parent().addClass("active");
          var r = "";
          t.find("a").each(function () {
            r += $(this).attr("rel") + " "
          });
          t.parent().removeClass("open");
          n.removeClass(r);
          n.addClass($(this).attr("rel"))
        })
      };

      $scope.initContainer = function() {
        $(".demo, .demo .column").sortable({
          connectWith: ".column",
          opacity: .35,
          start: function (e, t) {
            if (!$scope.startDrag) {
              $scope.stopSave++;
            }
            $scope.startDrag = 1;
          },
          stop: function (e, t) {
            if ($scope.stopSave > 0) {
              $scope.stopSave--;
            }
            $scope.startDrag = 0;
          }
        });
        configurationElm();
      };

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
      };

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
      };

      $scope.cleanHTML = function(e) {
        $(e).parent().append($(e).children().html())
        $(e).remove();
      };

      $scope.changeStructure = function(e, t) {
        $("#download-layout ." + e).removeClass(e).addClass(t)
      };

      function resizeCanvas(html, size) {
        var containerID = html.getElementsByClassName("changeDimension");
        var containerDownload = html.getElementById("download-layout").getElementsByClassName("container-fluid")[0];
        var row = html.getElementsByClassName("demo ui-sortable");
        var container1 = html.getElementsByClassName("container1");
        if (size == "md") {
          $(containerID).width('id', "MD");
          $(row).attr('id', "MD");
          $(container1).attr('id', "MD");
          $(containerDownload).attr('id', "MD");
        }
        if (size == "lg") {
          $(containerID).attr('id', "LG");
          $(row).attr('id', "LG");
          $(container1).attr('id', "LG");
          $(containerDownload).attr('id', "LG");
        }
        if (size == "sm") {
          $(containerID).attr('id', "SM");
          $(row).attr('id', "SM");
          $(container1).attr('id', "SM");
          $(containerDownload).attr('id', "SM");
        }
        if (size == "xs") {
          $(containerID).attr('id', "XS");
          $(row).attr('id', "XS");
          $(container1).attr('id', "XS");
          $(containerDownload).attr('id', "XS");
        }
      }

      $scope.getLayoutBodyContent = function(size) {
        resizeCanvas(document, size);
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
          html += '<link media="screen" rel="stylesheet" href="css/' + $scope.assets["css"][i][1] + $scope.assets["css"][i][2] + '" />\n';
        }
        html +=
          "\
          </head>\n\
            <body>\n\
            " + $scope.getLayoutBodyContent('sm') + "\n\
            </body>\n\
            <script type=\"text/javascript\">\n\
              $(document).ready(function() {\
                $('.carousel').carousel();\n\
              });\
            </script>\n\
          </html>";
        $scope.getLayoutBodyContent('lg');
        return html;
      }

      $scope.saveCurrentPage = function() {
        console.log("SAVING CURRENT PAGE");
        return new Promise(function(resolve, reject) {
          console.log($rootScope.currentApp.getPath());
          console.log($scope.currentPage + ".html");
          console.log($scope.getLayoutHTML());
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
              $scope.currentPage = pageName;
              $scope.emptyCurrentPage();
              $scope.fillCurrentPage(content);
              $('.carousel').carousel();
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
      };

      function gridSystemGenerator() {
        $(".lyrow .preview input").bind("keyup", function () {
          var e = 0;
          var t = "";
          var n = $(this).val().split(" ", 12);
          $.each(n, function (n, r) {
            e = e + parseInt(r);
            t += '<div class="span' + r + ' column"></div>'
          });
          if (e == 12) {
            $(this).parent().next().children().html(t);
            $(this).parent().prev().show()
          } else {
            $(this).parent().prev().hide()
          }
        });
      }

      function removeElm() {
        $(".demo").delegate(".remove", "click", function (e) {
          e.preventDefault();
          $(this).parent().remove();
          if (!$(".demo .lyrow").length > 0) {
            $scope.clearLayout();
          }
        })
      }

      $scope.$on('$ionicView.afterEnter', function () {
        console.log("EditorCtrl::afterEnter");

        function initPage() {
          $scope.bindEditors();
          $scope.bindSortables();

          $window.CKEDITOR.disableAutoInline = true;

          $(window).resize(function () {
            $("body").css("min-height", $(window).height());
            $(".demo").css("min-height", $(window).height())
          });

          $("body").css("min-height", $(window).height());
          $(".demo").css("min-height", $(window).height());

          $scope.initContainer();

          cyan.initEditor();

          removeElm();
          gridSystemGenerator();
          $scope.handleJsIds();

          $window.setInterval(
            function () {
              $scope.handleSaveLayout()
            },
            $scope.timerSaveLayout
          );
        }

        $scope.loadPage($scope.currentPage).then(
          initPage,
          initPage
        );
      });

      $scope.$on("$ionicView.afterLeave", function() {
        console.log("EditorCtrl::afterLeave");
        $scope.clearLayout();
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
                scope.handleJsIds();
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
