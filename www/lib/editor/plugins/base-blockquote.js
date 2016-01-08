/**
 * Created by talanor on 1/7/16.
 */

/**
 * Created by talanor on 1/6/16.
 */

(function(EditorPlugin, $) {
  function Blockquote() {
    this.version = "0.1";
    this.name = "blockquote";
  }

  Blockquote.prototype = {
    isThis: function(dom) {
      console.log(dom);
      dom = $(dom);
      return dom.prop("tagName") == "BLOCKQUOTE";
    },
    getElts: function(dom) {
      return [
        {tag: "ckeditor", key: "blockquote", value: $(dom).html()}
      ];
    },
    setData: function(dom, key, val) {
      if (key == "blockquote") {
        $(dom).html(val);
      }
    },
    BaseDOM:
      '<!-- Blockquote -->\
      <div class="box box-element ui-draggable" editor-box>\
        <a href="#close" class="remove label label-danger">\
          <i class="icon ion-close"></i>\
        </a>\
        <span class="configuration">\
          <a class="btn btn-mini" href="#" rel="pull-right">\
            Pull Right\
          </a>\
        </span>\
        <div class="preview">Citation</div>\
        <div class="view clearfix">\
          <blockquote class="editor-element">\
            <p>\
              Lorem ipsum dolor sit amet,\
              consectetur adipiscing elit.\
              Integer\
              posuere erat a ante.\
            </p>\
            <small>Someone\
              <cite title="Source Title">\
                famous\
                Source Title\
              </cite>\
            </small>\
          </blockquote>\
        </div>\
      </div>'
  };

  EditorPlugin.basics.push(new Blockquote());
})(EditorPlugin, jQuery)
