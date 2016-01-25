(function(EditorPlugin, $) {
  function Image() {
    this.version = "0.1";
    this.name = "image";
  }

  Image.prototype = {
    isThis: function(dom) {
      console.log(dom);
      dom = $(dom);
      return dom.prop("tagName") == "DIV" && dom.children().length == 1 && dom.children().first().prop("tagName") == "IMG";
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
      '<!-- Image -->\
      <div class="box box-element ui-draggable" editor-box>\
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
              <li class=""><a href="#" rel="img-rounded">Rounded</a></li>\
              <li class=""><a href="#" rel="img-circle">Circle</a></li>\
              <li class=""><a href="#" rel="img-polaroid">Polaroid</a></li>\
            </ul>\
          </span>\
        </span>\
        <div class="preview">Image</div>\
        <div class="view editor-element">\
          <img alt="140x140" src="img/a.jpg" />\
        </div>\
      </div>'
  };

  EditorPlugin.basics.push(new Image());
})(EditorPlugin, jQuery)
