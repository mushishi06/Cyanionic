(function(EditorPlugin, $) {
  function Header() {
    this.version = "0.1";
    this.name = "header";
  }

  Header.prototype = {
    isThis: function(dom) {
      console.log(dom);
      dom = $(dom);
      return dom.prop("tagName") == "DIV" && dom.hasClass("page-header");
    },
    getElts: function(dom) {
      return [
        {tag: "ckeditor", key: "header", value: $(dom).html()}
      ];
    },
    setData: function(dom, key, val) {
      if (key == "header") {
        $(dom).html(val);
      }
    },
    BaseDOM:
      '<div class="box box-element ui-draggable" editor-box>\
        <a href="#close" class="remove label label-danger">\
          <i class="icon ion-close"></i>\
        </a>\
        <span class="configuration">\
          <button type="button" class="btn btn-mini" data-target="#editorModal" role="button" data-toggle="modal">\
            Editor\
          </button>\
        </span>\
        <div class="preview">Page Header</div>\
        <div class="view">\
          <div class="page-header editor-element">\
            <h1>Example Page Header\
              <small>Subtext for header</small>\
            </h1>\
          </div>\
        </div>\
      </div>'
  };

  EditorPlugin.page.push(new Header());
})(EditorPlugin, jQuery)
