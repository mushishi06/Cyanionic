/**
 * Created by talanor on 1/7/16.
 */

/**
 * Created by talanor on 1/6/16.
 */

(function(EditorPlugin, $) {
  function Form() {
    this.version = "0.1";
    this.name = "form";
  }

  Form.prototype = {
    isThis: function(dom) {
      console.log(dom);
      dom = $(dom);
      return dom.prop("tagName") == "DIV" && dom.children().first().prop("tagName") == "FORM";
    },
    getElts: function(dom) {
      return [
        {tag: "ckeditor", key: "form", value: $(dom).html()}
      ];
    },
    setData: function(dom, key, val) {
      if (key == "form") {
        $(dom).html(val);
      }
    },
    BaseDOM:
      '<!-- Form -->\
      <div class="box box-element ui-draggable" editor-box>\
        <a href="#close" class="remove label label-danger">\
          <i class="icon ion-close"></i>\
        </a>\
        <span class="configuration">\
          <button type="button" class="btn btn-mini" data-target="#editorModal"\
            role="button" data-toggle="modal">\
            Editor\
          </button>\
          <a class="btn btn-mini" href="#" rel="form-inline">\
            Inline\
          </a>\
        </span>\
        <div class="preview">Formulaire</div>\
        <div class="view editor-element">\
          <form>\
            <fieldset>\
              <legend>\
                Legend\
              </legend>\
              <label>\
                Label name\
              </label>\
              <input type="text" placeholder="Type something…" />\
              <span class="help-block">\
                Example block-level help text here..\
              </span>\
              <label class="checkbox">\
                <input type="checkbox" />\
                Check me out\
              </label>\
              <button type="submit" class="btn">\
                Submit\
              </button>\
            </fieldset>\
          </form>\
        </div>\
      </div>'
  };

  EditorPlugin.basics.push(new Form());
})(EditorPlugin, jQuery)
