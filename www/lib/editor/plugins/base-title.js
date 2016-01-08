/**
 * Created by talanor on 1/6/16.
 */

(function(EditorPlugin, $) {
  function Title() {
    this.version = "0.1";
    this.name = "title";
  }

  Title.prototype = {
    isThis: function(dom) {
      return dom.tagName == "H3";
    },
    getElts: function(dom) {
      return [
        {tag: "input", key: "title", value: $(dom).text()}
      ];
    },
    setData: function(dom, key, val) {
      if (key == "title") {
        $(dom).text(val);
      }
    },
    BaseDOM:
    '<!-- Title -->\
    <div class="box box-element ui-draggable" editor-box>\
      <a href="#close" class="remove label label-danger">\
        <i class="icon ion-close"></i>\
      </a>\
      <span class="configuration">\
        <span class="btn-group">\
          <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#">\
            Align\
            <span class="caret"></span>\
          </a>\
          <ul class="dropdown-menu">\
            <li class="active">\
              <a href="#" rel="">Default</a>\
            </li>\
            <li class="">\
              <a href="#" rel="text-left">Left</a>\
            </li>\
            <li class="">\
              <a href="#" rel="text-center">Center</a>\
            </li>\
            <li class="">\
              <a href="#" rel="text-right">Right</a>\
            </li>\
          </ul>\
        </span>\
        <span class="btn-group">\
          <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#">Emphasis\
            <span class="caret"></span>\
          </a>\
          <ul class="dropdown-menu">\
            <li class="active">\
              <a href="#" rel="">Default</a>\
            </li>\
            <li class="">\
              <a href="#" rel="muted">Muted</a>\
            </li>\
            <li class="">\
              <a href="#" rel="text-warning">Warning</a>\
            </li>\
            <li class="">\
              <a href="#" rel="text-error">Error</a>\
            </li>\
            <li class="">\
              <a href="#" rel="text-info">Info</a>\
            </li>\
            <li class="">\
              <a href="#" rel="text-success">Success</a>\
            </li>\
          </ul>\
        </span>\
      </span>\
      <div class="preview">Titre</div>\
      <div class="view">\
        <h3 class="editor-element">h3. Lorem ipsum dolor sit amet.</h3>\
      </div>\
    </div>'
  };

  EditorPlugin.basics.push(new Title());
})(EditorPlugin, jQuery)
