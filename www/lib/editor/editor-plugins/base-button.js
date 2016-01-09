/**
 * Created by talanor on 1/7/16.
 */

/**
 * Created by talanor on 1/6/16.
 */

(function(EditorPlugin, $) {
  function Button() {
    this.version = "0.1";
    this.name = "button";
  }

  Button.prototype = {
    isThis: function(dom) {
      console.log(dom);
      dom = $(dom);
      return dom.prop("tagName") == "DIV" && false;
    },
    getElts: function(dom) {
      return [
        {tag: "ckeditor", key: "button", value: $(dom).html()}
      ];
    },
    setData: function(dom, key, val) {
      if (key == "button") {
        $(dom).html(val);
      }
    },
    BaseDOM:
      '<!-- Button -->\
      <div class="box box-element ui-draggable" editor-box>\
        <a href="#close" class="remove label label-danger">\
          <i class="icon ion-close"></i>\
        </a>\
        <span class="configuration">\
          <span class="btn-group">\
            <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown"\
              href="#">\
              Styles\
              <span class="caret"></span>\
            </a>\
            <ul class="dropdown-menu">\
              <li class="active">\
                <a href="#" rel="">Default</a>\
              </li>\
              <li class="">\
                <a href="#" rel="btn-primary">Primary</a>\
              </li>\
              <li class="">\
                <a href="#" rel="btn-info">Info</a>\
              </li>\
              <li class="">\
                <a href="#" rel="btn-success">Success</a>\
              </li>\
              <li class="">\
                <a href="#" rel="btn-warning">Warning</a>\
              </li>\
              <li class="">\
                <a href="#" rel="btn-danger">Danger</a>\
              </li>\
              <li class="">\
                <a href="#" rel="btn-inverse">Inverse</a>\
              </li>\
              <li class="">\
                <a href="#" rel="btn-link">Link</a>\
              </li>\
            </ul>\
          </span>\
          <span class="btn-group">\
            <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown"\
              href="#">\
              Size\
              <span class="caret"></span>\
            </a>\
            <ul class="dropdown-menu">\
              <li class="">\
                <a href="#" rel="btn-large">Large</a>\
              </li>\
              <li class="active">\
                <a href="#" rel="">Default</a>\
              </li>\
              <li class="">\
                <a href="#" rel="btn-small">Small</a>\
              </li>\
              <li class="">\
                <a href="#" rel="btn-mini">Mini</a>\
              </li>\
            </ul>\
          </span>\
          <a class="btn btn-mini" href="#" rel="btn-block">Block</a>\
          <a class="btn btn-mini" href="#" rel="disabled">\
            Disabled\
          </a>\
        </span>\
        <div class="preview">Boutons</div>\
        <div class="view editor-element">\
          <button class="btn" type="button">\
            Button\
          </button>\
        </div>\
      </div>'
  };

  EditorPlugin.basics.push(new Button());
})(EditorPlugin, jQuery)
