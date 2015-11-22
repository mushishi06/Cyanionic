var webpage = "";
var pageName = "";
function supportstorage() {
  if (typeof window.localStorage == 'object')
    return true;
  else {
    return false;
  }
}

function handleSaveLayout() {
  var e = $(".demo").html();
  if (!stopsave && e != window.demoHtml) {
    stopsave++;
    window.demoHtml = e;
    saveLayout();
    stopsave--;
  }
}

var layouthistory;
function saveLayout() {
  var data = layouthistory;
  if (!data) {
    data = {};
    data.count = 0;
    data.list = [];
  }
  if (data.list.length > data.count) {
    for (i = data.count; i < data.list.length; i++)
      data.list[i] = null;
  }
  data.list[data.count] = window.demoHtml;
  data.count++;
  if (supportstorage()) {
    localStorage.setItem("layoutdata", JSON.stringify(data));
  }
  layouthistory = data;
}

function downloadLayout() {

  $.ajax(
    {
      type: "POST",
      url: "/build/downloadLayout",
      data: {layout: $('#download-layout').html()},
      success: function (data) {
        window.location.href = '/build/download';
      }
    });
}

function downloadHtmlLayout() {
  $.ajax(
    {
      type: "POST",
      url: "/build/downloadLayout",
      data: {
        layout: $('#download-layout').html()
      },
      success: function (data) {
        window.location.href = '/build/downloadHtml';
      }
    });
}

function undoLayout() {
  var data = layouthistory;
  //console.log(data);
  if (data) {
    if (data.count < 2) {
      return false;
    }
    window.demoHtml = data.list[data.count - 2];
    data.count--;
    $('.demo').html(window.demoHtml);
    if (supportstorage()) {
      localStorage.setItem("layoutdata", JSON.stringify(data));
    }
    return true;
  }
  return false;
}

function redoLayout() {
  var data = layouthistory;
  if (data) {
    if (data.list[data.count]) {
      window.demoHtml = data.list[data.count];
      data.count++;
      $('.demo').html(window.demoHtml);
      if (supportstorage()) {
        localStorage.setItem("layoutdata", JSON.stringify(data));
      }
      return true;
    }
  }
  return false;
}

function handleJsIds() {
  handleModalIds();
  handleAccordionIds();
  handleCarouselIds();
  handleTabsIds()
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
  var e = $(".demo #myCarousel");
  var t = randomNumber();
  var n = "carousel-" + t;
  e.attr("id", n);
  e.find(".carousel-indicators li").each(function (e, t) {
    $(t).attr("data-target", "#" + n)
  });
  e.find(".left").attr("href", "#" + n);
  e.find(".right").attr("href", "#" + n)
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

function randomNumber() {
  return randomFromInterval(1, 1e6)
}

function randomFromInterval(e, t) {
  return Math.floor(Math.random() * (t - e + 1) + e)
}

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
  })
}

function configurationElm(e, t) {
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
}

function removeElm() {
  $(".demo").delegate(".remove", "click", function (e) {
    e.preventDefault();
    $(this).parent().remove();
    if (!$(".demo .lyrow").length > 0) {
      clearDemo()
    }
  })
}

function clearDemo() {
  $(".demo").empty();
  layouthistory = null;
  if (supportstorage()) {
    localStorage.removeItem("layoutdata");
  }
}

function removeMenuClasses() {
  $("#menu-layoutit li button").removeClass("active")
}

function changeStructure(e, t) {
  $("#download-layout ." + e).removeClass(e).addClass(t)
}

function cleanHtml(e) {
  console.log(e);
  //$(e).parent().append($(e).children().html())
}

function downloadLayoutSrc() {
  var e = "";
  $("#download-layout").children().html($(".demo").html());
  var t = $("#download-layout").children();
  t.find(".preview, .configuration, .drag, .remove").remove();
  t.find(".lyrow").addClass("removeClean");
  t.find(".box-element").addClass("removeClean");
  t.find(".lyrow .lyrow .lyrow .lyrow .lyrow .removeClean").each(function () {
    cleanHtml(this)
  });
  t.find(".lyrow .lyrow .lyrow .lyrow .removeClean").each(function () {
    cleanHtml(this)
  });
  t.find(".lyrow .lyrow .lyrow .removeClean").each(function () {
    cleanHtml(this)
  });
  t.find(".lyrow .lyrow .removeClean").each(function () {
    cleanHtml(this)
  });
  t.find(".lyrow .removeClean").each(function () {
    cleanHtml(this)
  });
  t.find(".removeClean").each(function () {
    cleanHtml(this)
  });
  t.find(".removeClean").removeClass("removeClean");
  $("#download-layout .column").removeClass("ui-sortable");
  $("#download-layout .row-fluid").removeClass("clearfix").children().removeClass("column");
  if ($("#download-layout .container").length > 0) {
    changeStructure("row-fluid", "row")
  }
  formatSrc = $.htmlClean($("#download-layout").html(), {
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
  $("#downloadModal textarea").val(formatSrc)
  webpage = formatSrc;
}

var currentDocument = null;
var timerSave = 1000;
var stopsave = 0;
var startdrag = 0;
var demoHtml = $(".demo").html();
var currenteditor = null;

$(window).resize(function () {
  $("body").css("min-height", $(window).height() - 90);
  $(".demo").css("min-height", $(window).height() - 160)
});

function restoreData() {
  if (supportstorage()) {
    layouthistory = JSON.parse(localStorage.getItem("layoutdata"));
    if (!layouthistory) {
      return false;
    }
    window.demoHtml = layouthistory.list[layouthistory.count - 1];
    if (window.demoHtml) {
      $(".demo").html(window.demoHtml);
    }
  }
}

function initContainer() {
  $(".demo, .demo .column").sortable({
    connectWith: ".column",
    opacity: .35,
    start: function (e, t) {
      if (!startdrag) {
        stopsave++;
      }
      startdrag = 1;
    },
    stop: function (e, t) {
      if (stopsave > 0) {
        stopsave--;
      }
      startdrag = 0;
    }
  });
  configurationElm();
}

cyan.initEditor = function ($window, cordova, JSZip, $cordovaFile, FileTransfer, $ionicGesture, storageDir) {
  CKEDITOR.disableAutoInline = true;
  restoreData();
  var contenthandle = CKEDITOR.replace(
    'contenteditor', {
      language: 'en',
      contentsCss: ['css/bootstrap-combined.min.css'],
      allowedContent: true
    }
  );

  function openEditor(event) {
    console.log(event);
    currenteditor = $(event.currentTarget);
    var eText = currenteditor.html();
    contenthandle.setData(eText);
    $("#editorModal").modal({backdrop: false}).on("shown", function () {
      //$('.modal-backdrop').remove();
    });
  }

  var editorElts = document.getElementsByClassName("editor-element");

  for (var i = 0 ; i < editorElts.length ; ++i) {
    var elt = angular.element(editorElts[i]);
    $ionicGesture.on(
      "doubletap",
      function(event) {
       openEditor(event);
      },
      elt
    );
  }

  //interact('.editor-element').on('hold', openEditor);

  $("body").css("min-height", $(window).height() - 50);
  $(".demo").css("min-height", $(window).height() - 130);
  $(".sidebar-nav .lyrow").draggable({
    connectToSortable: ".demo",
    helper: "clone",
    cancel: "input",
    start: function (e, t) {
      if (!startdrag) {
        stopsave++;
      }
      startdrag = 1;
    },
    drag: function (e, t) {
      //t.helper.width(400)
    },
    stop: function (e, t) {
      console.log(e, t);
      $(".demo .column").sortable({
        opacity: .35,
        connectWith: ".column",
        start: function (e, t) {
          if (!startdrag) {
            stopsave++;
          }
          startdrag = 1;
        },
        stop: function (e, t) {
          if (stopsave > 0) {
            stopsave--;
          }
          startdrag = 0;
        }
      });
      if (stopsave > 0) {
        stopsave--;
      }
      startdrag = 0;
    }
  });

  $(".sidebar-nav .box").draggable({
    connectToSortable: ".column",
    helper: "clone",
    start: function (e, t) {
      if (!startdrag) {
        stopsave++;
      }
      startdrag = 1;
    },
    drag: function (e, t) {
      t.helper.width(400)
    },
    stop: function (event, ui) {
      handleJsIds();
      if (stopsave > 0) {
        stopsave--;
      }

      var editorElts = event.originalEvent.target.getElementsByClassName("editor-element");

      for (var i = 0 ; i < editorElts.length ; ++i) {
        var elt = angular.element(editorElts[i]);
        $ionicGesture.on(
          "doubletap",
          function(event) {
            openEditor(event);
          },
          elt
        );
      }

      //interact('.editor-element').on('hold', openEditor);
      startdrag = 0;
    }
  });
  initContainer();
  $('body.edit .demo').on("click", "[data-target=#editorModal]", function (e) {
    e.preventDefault();
    currenteditor = $(this).parent().parent().find('.view');
    var eText = currenteditor.html();
    contenthandle.setData(eText);
  });
  $("#savecontent").click(function (e) {
    e.preventDefault();
    currenteditor.html(contenthandle.getData());
  });
  $("[data-target=#downloadModal]").click(function (e) {
    e.preventDefault();
    downloadLayoutSrc();
  });
  $("[data-target=#shareModal]").click(function (e) {
    e.preventDefault();
    handleSaveLayout();
  });
  $("#download").click(function () {
    downloadLayout();
    return false
  });
  $("#downloadhtml").click(function () {
    downloadHtmlLayout();
    return false
  });
  $("#edit").click(function () {
    $("body").removeClass("devpreview sourcepreview");
    $("body").addClass("edit");
    removeMenuClasses();
    $(this).addClass("active");
    return false
  });
  $("#clear").click(function (e) {
    e.preventDefault();
    clearDemo()
  });
  $("#devpreview").click(function () {
    $("body").removeClass("edit sourcepreview");
    $("body").addClass("devpreview");
    removeMenuClasses();
    $(this).addClass("active");
    return false
  });
  $("#sourcepreview").click(function () {
    $("body").removeClass("edit");
    $("body").addClass("devpreview sourcepreview");
    removeMenuClasses();
    $(this).addClass("active");
    return false
  });
  $('#addpage').click(function () {
    addPage();
  });
  $('#delpage').click(function () {
    delPage();
  });
  $("#fluidPage").click(function (e) {
    e.preventDefault();
    changeStructure("container", "container-fluid");
    $("#fixedPage").removeClass("active");
    $(this).addClass("active");
    downloadLayoutSrc()
  });
  $("#fixedPage").click(function (e) {
    e.preventDefault();
    changeStructure("container-fluid", "container");
    $("#fluidPage").removeClass("active");
    $(this).addClass("active");
    downloadLayoutSrc()
  });
  $(".nav-header").click(function () {
    $(".sidebar-nav .boxes, .sidebar-nav .rows").hide();
    $(this).next().slideDown()
  });
  $('#undo').click(function () {
    stopsave++;
    if (undoLayout()) initContainer();
    stopsave--;
  });
  $('#redo').click(function () {
    stopsave++;
    if (redoLayout()) initContainer();
    stopsave--;
  });
  removeElm();
  gridSystemGenerator();
  setInterval(function () {
    handleSaveLayout()
  }, timerSave)

  function getHTML() {
    downloadLayoutSrc();
    webpage =
      '<html>\n\
              <head>\n\
                      <script type="text/javascript" src="js/jquery-2.0.0.min.js"></script>\n\
                      <script type="text/javascript" src="js/jquery-ui.js"></script>\n\
                      <script type="text/javascript" src="js/bootstrap.min.js"></script>\n\
                      <link href="css/bootstrap-combined.min.css" rel="stylesheet" media="screen">\n\
              </head>\n\
              <body>\n' + webpage + '\n</body>\n\
        </html>'

    return webpage;
  }

  function saveHtml($cordovaFile, storageDir, pageName) {
    var assets = {
      "js": [
        [cordova.file.applicationDirectory + "/www/lib/jquery/", "jquery-2.0.0.min.js"],
        [cordova.file.applicationDirectory + "/www/lib/jquery/", "jquery-ui.js"],
        [cordova.file.applicationDirectory + "/www/lib/bootstrap/", "bootstrap.min.js"],
      ],
      "css": [
        [cordova.file.applicationDirectory + "/www/css/", "bootstrap-combined.min.css"]
      ]
    }

    var appName = "apptest";

    $cordovaFile.createDir(storageDir, appName, false);

    var appDirPath = storageDir + "/" + appName;

    var jsDirName = "js";
    var jsDirPath = appDirPath + "/" + jsDirName;

    var cssDirName = "css";
    var cssDirPath = appDirPath + "/" + cssDirName;

    $cordovaFile.writeFile(appDirPath, pageName + ".html", getHTML(), true);

    for (assetDir in assets) {
      $cordovaFile.createDir(appDirPath, assetDir, true);
      for (asset in assets[assetDir]) {
        $cordovaFile.copyFile(assets[assetDir][asset][0], assets[assetDir][asset][1], assetDir, assets[assetDir][asset][1]);
      }
    }

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
                    console.log(appDirPath + "/" + curPath);
                    $cordovaFile.readAsText(appDirPath + "/" + curPath, curName)
                      .then(function (result) {
                        resolve({filePath: curPath, fileName: curName, content: result});
                      }, function (error) {
                        reject({filePath: curPath, fileName: curName, content: error});
                      });
                  })
                );
              }
            }

            Promise.all(rPromises).then(function () {
              resolve();
            }, function () {
              reject();
            });
          },
          function (err) {
            console.log(err);
            error = true;
            reject();
          }
        );
      });
    }

    var res = $window.resolveLocalFileSystemURL(
      appDirPath,
      function (directoryEntry) {
        var buildPromises = zipDir(directoryEntry, "");

        buildPromises.then(function () {
          console.log("SUCCESS");

          for (i in promises) {
            promises[i].then(function (result) {
              console.log(result.filePath + result.fileName);
              zip.file(result.filePath + result.fileName, result.content);
            }, function (error) {
              console.log(error);
            })
          }

          Promise.all(promises).then(function () {
            $cordovaFile.writeFile(storageDir, appName + ".zip", zip.generate({type: "blob"}), true)
              .then(function (success) {
                console.log("Succeeded in writing zip");

                var options = new FileUploadOptions();
                options.fileKey = "app";
                options.fileName = appName + ".zip";
                options.mimeType = "application/zip";

                var params = {};
                params.username = "foo";
                params.password = "foobar";
                params.name = "randomapptest";

                options.params = params;

                var ft = new FileTransfer();
                var uploaded = ft.upload(
                  storageDir + "/" + appName + ".zip",
                  encodeURI("https://cyandev.xyz:5555/api/send_app"),
                  function () {
                    console.log("Upload succeeded");
                  },
                  function () {
                    console.log("Upload failed");
                  },
                  options,
                  true
                );
                console.log("uploaded : ", uploaded);
              }, function (error) {
                console.log(error);
              });
          }, function () {
            //  One of the file promises failed
          });
          console.log(promises);
        }, function () {
          console.log("FALURE");
        });
      },
      function (err) {
        console.log(err);
      }
    );
  }

  $("#save-button").on("click", function (event) {
    saveHtml($cordovaFile, storageDir, "index");
  });

  function getPageName() {
    if (pageName != "") {
      return pageName;
    }

    while (true) {
      pageName = prompt("Enter a name for the page", "");
      if (pageName != null) {
        if (pageName.slice(-5) != ".html") {
          pageName += ".html";
        }
        return pageName;
      }
    }
  }

  function addPage() {
    pageName = getPageName();
    saveHtml($cordovaFile, storageDir, pageName);
    pageName = "";
    clearDemo();
  }

  function delPage() {
  }

}
