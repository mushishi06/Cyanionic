(function(EditorPlugin, $) {
  function Alert() {
    this.version = "0.1";
    this.name = "alert";
  }

  Alert.prototype = {
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
              Styles\
              <span class="caret"></span>\
            </a>\
            <ul class="dropdown-menu">\
              <li class="active"><a href="#" rel="">Default</a></li>\
              <li class=""><a href="#" rel="alert-info">Info</a></li>\
              <li class=""><a href="#" rel="alert-error">Error</a></li>\
              <li class=""><a href="#" rel="alert-success">Success</a></li>\
            </ul>\
          </span>\
        </span>\
        <div class="preview">Alerts</div>\
        <div class="view">\
          <div class="alert">\
            <button type="button" class="close" data-dismiss="alert">×</button>\
            <h4>Alert!</h4>\
            <strong>Warning!</strong>\
               Bacon ipsum dolor sit amet ground round culpa\
              elit, irure incididunt short ribs tongue sed.\
          </div>\
        </div>\
      </div>'
  };

  EditorPlugin.interact.push(new Alert());
})(EditorPlugin, jQuery)
