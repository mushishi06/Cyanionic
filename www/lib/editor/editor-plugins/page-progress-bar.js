(function(EditorPlugin, $) {
  function ProgressBar() {
    this.version = "0.1";
    this.name = "progress-bar";
  }

  ProgressBar.prototype = {
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
          <span class="btn-group">\
            <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#">\
              Colors\
              <span class="caret"></span>\
            </a>\
            <ul class="dropdown-menu">\
              <li class="active">\
                <a href="#" rel="">Default</a>\
              </li>\
              <li class="">\
                <a href="#" rel="progress-info">Info</a>\
              </li>\
              <li class="">\
                <a href="#" rel="progress-success">Success</a>\
              </li>\
              <li class="">\
                <a href="#" rel="progress-warning">Warning</a>\
              </li>\
              <li class="">\
                <a href="#" rel="progress-danger">Danger</a>\
              </li>\
            </ul>\
          </span>\
          <a class="btn btn-mini" href="#" rel="progress-striped">Striped</a>\
          <a class="btn btn-mini" href="#" rel="active">Active</a>\
        </span>\
        <div class="preview">Progress Bar</div>\
        <div class="view">\
          <div class="progress">\
            <div class="bar" style="width: 60%;"></div>\
          </div>\
        </div>\
      </div>'
  };

  EditorPlugin.page.push(new ProgressBar());
})(EditorPlugin, jQuery)
