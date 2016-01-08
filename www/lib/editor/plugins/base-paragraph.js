/**
 * Created by talanor on 1/7/16.
 */

/**
 * Created by talanor on 1/6/16.
 */

(function(EditorPlugin, $) {
  function Paragraph() {
    this.version = "0.1";
    this.name = "paragraph";
  }

  Paragraph.prototype = {
    isThis: function(dom) {
      console.log(dom);
      dom = $(dom);
      return dom.prop("tagName") == "DIV" && dom.children().first().prop("tagName") == "P";
    },
    getElts: function(dom) {
      return [
        {tag: "ckeditor", key: "paragraph", value: $(dom).html()}
      ];
    },
    setData: function(dom, key, val) {
      if (key == "paragraph") {
        $(dom).html(val);
      }
    },
    BaseDOM:
      '<!-- Paragraph -->\
        <div class="box box-element ui-draggable" editor-box>\
          <a href="#close" class="remove label label-danger">\
            <i class="icon ion-close"></i>\
          </a>\
          <span class="configuration">\
            <button type="button" class="btn btn-mini" data-target="#editorModal"\
              role="button" data-toggle="modal">\
              Editor\
            </button>\
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
              <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#">\
                Emphasis\
                <span class="caret"></span>\
              </a>\
              <ul class="dropdown-menu">\
                <li class="active">\
                  <a href="#" rel="">Default</a>\
                </li>\
                <li class="">\
                  <a href="#" rel="muted">muted</a>\
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
            <a class="btn btn-mini" href="#" rel="lead">\
              Lead\
            </a>\
          </span>\
          <div class="preview">Paragraphe</div>\
          <div class="view editor-element">\
            <p>\
              Lorem ipsum dolor sit amet, <strong>consectetur adipiscing\
              elit</strong>. Aliquam eget sapien sapien. Curabitur in metus urna. In\
              hac habitasse platea dictumst. Phasellus eu sem sapien, sed vestibulum\
              velit. Nam purus nibh, lacinia non faucibus et, pharetra in dolor. Sed\
              iaculis posuere diam ut cursus. Morbi commodo sodales nisi id sodales.\
              Proin consectetur, nisi id commodo imperdiet, metus nunc consequat\
              lectus, id bibendum diam velit et dui. Proin massa magna, vulputate nec\
              bibendum nec, posuere nec lacus. Aliquam mi erat, aliquam vel luctus eu,\
              pharetra quis elit. Nulla euismod ultrices massa, et feugiat ipsum\
              consequat eu.\
            </p>\
        </div>\
      </div>'
  };

  EditorPlugin.basics.push(new Paragraph());
})(EditorPlugin, jQuery)
