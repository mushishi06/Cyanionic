/**
 * Created by talanor on 1/7/16.
 */

/**
 * Created by talanor on 1/6/16.
 */

(function(EditorPlugin, $) {
  function Address() {
    this.version = "0.1";
    this.name = "address";
  }

  Address.prototype = {
    isThis: function(dom) {
      console.log(dom);
      dom = $(dom);
      return dom.prop("tagName") == "ADDRESS";
    },
    getElts: function(dom) {
      return [
        {tag: "ckeditor", key: "address", value: $(dom).html()}
      ];
    },
    setData: function(dom, key, val) {
      if (key == "address") {
        $(dom).html(val);
      }
    },
    BaseDOM:
      '<!-- Address -->\
      <div class="box box-element ui-draggable" editor-box>\
        <a href="#close" class="remove label label-danger">\
          <i class="icon ion-close"></i>\
        </a>\
        <span class="configuration">\
          <button type="button" class="btn btn-mini" data-target="#editorModal"\
            role="button" data-toggle="modal">\
            Editor\
          </button>\
        </span>\
        <div class="preview">Addresse</div>\
        <div class="view">\
          <address class="editor-element">\
            <strong>\
              Twitter, Inc.\
            </strong>\
            <br />\
            795 Folsom Ave, Suite 600\
            <br />\
            San Francisco, CA 94107<br>\
            <abbr title="Phone">P:</abbr>\
            (123)\
            456-7890\
          </address>\
        </div>\
      </div>'
  };

  EditorPlugin.basics.push(new Address());
})(EditorPlugin, jQuery)
