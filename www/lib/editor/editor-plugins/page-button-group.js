(function(EditorPlugin, $) {
  function ButtonGroup() {
    this.version = "0.1";
    this.name = "button-group";
  }

  ButtonGroup.prototype = {
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
              Orientation\
              <span class="caret"></span>\
            </a>\
            <ul class="dropdown-menu">\
              <li class="active"><a href="#" rel="">Default</a></li>\
              <li class=""><a href="#" rel="btn-group-vertical">Vertical</a></li>\
            </ul>\
          </span>\
        </span>\
        <div class="preview">Button Group</div>\
          <div class="view">\
            <div class="btn-group">\
              <button class="btn" type="button">\
                <i class="icon-align-left"></i>\
              </button>\
              <button class="btn" type="button">\
                <i class="icon-align-center"></i>\
              </button>\
              <button class="btn" type="button">\
                <i class="icon-align-right"></i>\
              </button>\
              <button class="btn" type="button">\
                <i class="icon-align-justify"></i>\
              </button>\
            </div>\
          </div>\
        </div>'
  };

  EditorPlugin.page.push(new ButtonGroup());
})(EditorPlugin, jQuery)
