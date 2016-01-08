(function(EditorPlugin, $) {
  function Navs() {
    this.version = "0.1";
    this.name = "navs";
  }

  Navs.prototype = {
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
          <span class="btn-group">\
            <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#">\
              Styles\
              <span class="caret"></span>\
            </a>\
            <ul class="dropdown-menu">\
              <li class=""><a href="#" rel="nav-tabs">Default</a></li>\
              <li class=""><a href="#" rel="nav-pills">Pills</a></li>\
            </ul>\
          </span>\
          <a class="btn btn-mini" href="#" rel="nav-stacked">Stacked</a>\
        </span>\
        <div class="preview">Navs</div>\
        <div class="view element-editor">\
          <ul class="nav nav-tabs">\
            <li class="active"><a href="#">Home</a></li>\
            <li><a href="#">Profile</a></li>\
            <li class="disabled"><a href="#">Messages</a></li>\
            <li class="dropdown pull-right">\
              <a href="#" data-toggle="dropdown" class="dropdown-toggle">\
                Dropdown\
                <b class="caret"></b>\
              </a>\
              <ul class="dropdown-menu">\
                <li>\
                  <a href="#">Action</a>\
                </li>\
                <li>\
                  <a href="#">Another Action</a>\
                </li>\
                <li>\
                  <a href="#">Something else here</a>\
                </li>\
                <li class="divider"></li>\
                <li>\
                  <a href="#">Separated Link</a>\
                </li>\
              </ul>\
            </li>\
          </ul>\
        </div>\
      </div>'
  };

  EditorPlugin.page.push(new Navs());
})(EditorPlugin, jQuery)
