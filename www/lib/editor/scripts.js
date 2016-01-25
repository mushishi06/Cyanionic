var webpage = "";

var layouthistory;

function removeMenuClasses() {
  $("#menu-layoutit li button").removeClass("active")
}

function changeStructure(e, t) {
  $("#download-layout ." + e).removeClass(e).addClass(t)
}

var currentDocument = null;
var stopsave = 0;
var startdrag = 0;
var demoHtml = $(".demo").html();
var currenteditor = null;

cyan.initEditor = function ($window, cordova, JSZip, $cordovaFile, FileTransfer, $ionicGesture, storageDir) {
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
}
