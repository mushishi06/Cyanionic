(function(EditorPlugin, $) {
  function Panel() {
    this.version = "0.1";
    this.name = "panel";
  }

  Panel.prototype = {
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
              <li class="active">\
                <a href="#" rel="panel-default">Default</a>\
              </li>\
              <li class=""><a href="#" rel="panel-primary">Primary</a></li>\
              <li class=""><a href="#" rel="panel-success">Success</a></li>\
              <li class=""><a href="#" rel="panel-info">Info</a></li>\
              <li class=""><a href="#" rel="panel-warning">Warning</a></li>\
              <li class=""><a href="#" rel="panel-danger">Danger</a></li>\
            </ul>\
          </span>\
        </span>\
        <div class="preview">Panels</div>\
        <div class="view">\
          <div class="panel panel-default">\
            <div class="panel-heading">\
              <h3 class="panel-title">Panel title</h3>\
            </div>\
            <div class="panel-body">Panel content</div>\
            <div class="panel-footer">Panel footer</div>\
          </div>\
        </div>\
      </div>'
  };

  EditorPlugin.page.push(new Panel());
})(EditorPlugin, jQuery)
