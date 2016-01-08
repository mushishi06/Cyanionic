(function(EditorPlugin, $) {
  function Table() {
    this.version = "0.1";
    this.name = "table";
  }

  Table.prototype = {
    isThis: function(dom) {
      console.log(dom);
      dom = $(dom);
      return dom.prop("tagName") == "DIV" && dom.children().first().prop("tagName") == "TABLE";
    },
    getElts: function(dom) {
      return [
        {tag: "ckeditor", key: "table", value: $(dom).html()}
      ];
    },
    setData: function(dom, key, val) {
      if (key == "table") {
        $(dom).html(val);
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
          <span class="btn-group">\
            <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#">\
              Style\
              <span class="caret"></span>\
            </a>\
            <ul class="dropdown-menu">\
              <li class="active">\
                <a href="#" rel="">Default</a>\
              </li>\
              <li class="">\
                <a href="#" rel="table-striped">Striped</a>\
              </li>\
              <li class="">\
                <a href="#" rel="table-bordered">Bordered</a>\
              </li>\
            </ul>\
          </span>\
          <a class="btn btn-mini" href="#" rel="table-hover">\
            Hover\
          </a>\
          <a class="btn btn-mini" href="#" rel="table-condensed">\
            Condensed\
          </a>\
        </span>\
        <div class="preview">Tableau</div>\
        <div class="view editor-element">\
          <table class="table">\
            <thead>\
              <tr>\
                <th>#</th>\
                <th>Product</th>\
                <th>Payment Taken</th>\
                <th>Status</th>\
              </tr>\
            </thead>\
            <tbody>\
              <tr>\
                <td>1</td>\
                <td>TB - Monthly</td>\
                <td>01/04/2012</td>\
                <td>Default</td>\
              </tr>\
              <tr class="success">\
                <td>1</td>\
                <td>TB - Monthly</td>\
                <td>01/04/2012</td>\
                <td>Approved</td>\
              </tr>\
              <tr class="error">\
                <td>2</td>\
                <td>TB - Monthly</td>\
                <td>02/04/2012</td>\
                <td>Declined</td>\
              </tr>\
              <tr class="warning">\
                <td>3</td>\
                <td>TB - Monthly</td>\
                <td>03/04/2012</td>\
                <td>Pending</td>\
              </tr>\
              <tr class="info">\
                <td>4</td>\
                <td>TB - Monthly</td>\
                <td>04/04/2012</td>\
                <td>\
                  Call in to confirm\
                </td>\
              </tr>\
            </tbody>\
          </table>\
        </div>\
      </div>'
  };

  EditorPlugin.basics.push(new Table());
})(EditorPlugin, jQuery)
