(function(EditorPlugin, $) {
  function ListGroup() {
    this.version = "0.1";
    this.name = "list-group";
  }

  ListGroup.prototype = {
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
        <div class="preview">List group</div>\
        <div class="view">\
          <div class="list-group">\
            <a href="#" class="list-group-item active">Home</a>\
            <div class="list-group-item">List header</div>\
            <div class="list-group-item">\
              <h4 class="list-group-item-heading">\
                List group item heading\
              </h4>\
              <p class="list-group-item-text">...</p>\
            </div>\
            <div class="list-group-item">\
              <span class="badge">14</span>Help\
            </div>\
            <a class="list-group-item active">\
              <span class="badge">14</span>Help\
            </a>\
          </div>\
        </div>\
      </div>'
  };

  EditorPlugin.page.push(new ListGroup());
})(EditorPlugin, jQuery)
