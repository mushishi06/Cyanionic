/**
 * Created by talanor on 1/7/16.
 */

/**
 * Created by talanor on 1/6/16.
 */

(function(EditorPlugin, $) {
  function OrderedList() {
    this.version = "0.1";
    this.name = "address";
  }

  OrderedList.prototype = {
    isThis: function(dom) {
      console.log(dom);
      dom = $(dom);
      return dom.prop("tagName") == "DIV" && dom.children().length == 1 && dom.children().first().prop("tagName") == "OL";
    },
    getElts: function(dom) {
      return [
        {tag: "ckeditor", key: "olist", value: $(dom).find("ol").html()}
      ];
    },
    setData: function(dom, key, val) {
      if (key == "olist") {
        $(dom).find("ol").html(val);
      }
    },
    BaseDOM:
      '<div class="box box-element ui-draggable" editor-box>\
        <a href="#close" class="remove label label-danger">\
          <i class="icon ion-close"></i>\
        </a>\
        <span class="configuration">\
          <button type="button" class="btn btn-mini" data-target="#editorModal"\
            role="button" data-toggle="modal">\
            Editor\
          </button>\
          <a class="btn btn-mini" href="#" rel="unstyled">\
            Unstyled\
          </a>\
          <a class="btn btn-mini" href="#" rel="inline">\
            Inline\
          </a>\
        </span>\
        <div class="preview">Liste indexee</div>\
        <div class="view editor-element">\
          <ol>\
            <li>Lorem ipsum dolor sit amet</li>\
            <li>Consectetur adipiscing elit</li>\
            <li>Integer molestie lorem at massa</li>\
            <li>Facilisis in pretium nisl aliquet</li>\
            <li>Nulla volutpat aliquam velit</li>\
            <li>Faucibus porta lacus fringilla vel</li>\
            <li>Aenean sit amet erat nunc</li>\
            <li>Eget porttitor lorem</li>\
          </ol>\
        </div>\
      </div>'
  };

  EditorPlugin.basics.push(new OrderedList());
})(EditorPlugin, jQuery)
