(function (EditorPlugin, $) {
  function ButtonGroup() {
    this.version = "0.1";
    this.name = "button-group";
  }

  ButtonGroup.prototype = {
    isThis: function (dom) {
      console.log(dom);
      dom = $(dom);
      return dom.prop("tagName") == "DIV" && false;
    },
    getElts: function (dom) {
      return [
        {tag: "input", key: "src", value: $(dom).find("img").attr("src")}
      ];
    },
    setData: function (dom, key, val) {
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
          <a class="btn btn-mini" href="#" rel="dropup">Dropup</a>\
        </span>\
        <div class="preview">\
          Button Dropdowns\
        </div>\
        <div class="view editor-element">\
          <div class="btn-group">\
            <button class="btn">\
              Action\
            </button>\
            <button data-toggle="dropdown" class="btn dropdown-toggle">\
              <span class="caret"></span>\
            </button>\
            <ul class="dropdown-menu">\
              <li>\
                <a href="#">Action</a>\
              </li>\
              <li>\
                <a href="#">\
                  Another Action\
                </a>\
              </li>\
              <li>\
                <a href="#">\
                  Something Else here\
                </a>\
              </li>\
              <li class="divider"></li>\
              <li class="dropdown-submenu">\
                <a tabindex="-1" href="#">\
                  More Option\
                </a>\
                <ul class="dropdown-menu">\
                  <li>\
                    <a href="#">Action</a>\
                  </li>\
                  <li>\
                    <a href="#">\
                      Another Action\
                    </a>\
                  </li>\
                  <li>\
                    <a href="#">Something Else here</a>\
                  </li>\
                </ul>\
              </li>\
            </ul>\
          </div>\
        </div>\
      </div>'
  };

  EditorPlugin.page.push(new ButtonGroup());
})(EditorPlugin, jQuery)
