(function(EditorPlugin, $) {
  function BreadCrumb() {
    this.version = "0.1";
    this.name = "breadcrumb";
  }

  BreadCrumb.prototype = {
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
          <button type="button" class="btn btn-mini" data-target="#editorModal" role="button" data-toggle="modal">\
            Editor\
          </button>\
        </span>\
        <div class="preview">Breadcrumb</div>\
        <div class="view">\
          <ul class="breadcrumb">\
            <li>\
              <a href="#">Home</a>\
              <span class="divider">/</span>\
            </li>\
            <li>\
              <a href="#">Library</a>\
              <span class="divider">/</span>\
            </li>\
            <li class="active">Application</li>\
          </ul>\
        </div>\
      </div>'
  };

  EditorPlugin.page.push(new BreadCrumb());
})(EditorPlugin, jQuery)
