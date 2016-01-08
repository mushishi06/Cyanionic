(function(EditorPlugin, $) {
  function NavigationList() {
    this.version = "0.1";
    this.name = "navigation-list";
  }

  NavigationList.prototype = {
    isThis: function(dom) {
      console.log(dom);
      dom = $(dom);
      return dom.prop("tagName") == "DIV" && false;
    },
    getElts: function(dom) {
      return [
        {tag: "input", key: "src", value: $(dom).find("img").attr("src")}
      ];
    },
    setData: function(dom, key, val) {
      if (key == "src") {
        $(dom).find("img").attr("src", val);
      }
    },
    BaseDOM:
      '<div class="box box-element ui-draggable" editor-box>\
        <a href="#close" class="remove label label-danger">\
          <i class="icon ion-close"></i>\
        </a>\
        <span class="configuration">\
          <button type="button" class="btn btn-mini" data-target="#editorModal" role="button" data-toggle="modal">\
            Editor\
          </button>\
          <a class="btn btn-mini" href="#" rel="well">\
            Well\
          </a>\
        </span>\
        <div class="preview">Navigation List</div>\
        <div class="view">\
          <ul class="nav nav-list">\
            <li class="nav-header">Headers</li>\
            <li class="active"><a href="#">Home</a></li>\
            <li><a href="#">Library</a></li>\
            <li><a href="#">Application</a></li>\
            <li class="nav-header">Another List Header</li>\
            <li><a href="#">Profile</a></li>\
            <li><a href="#">Settings</a></li>\
            <li class="divider"></li>\
            <li><a href="#">Help</a></li>\
          </ul>\
        </div>\
      </div>'
  };

  EditorPlugin.page.push(new NavigationList());
})(EditorPlugin, jQuery)
