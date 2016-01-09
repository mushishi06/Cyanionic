(function(EditorPlugin, $) {
  function Navbar() {
    this.version = "0.1";
    this.name = "navbar";
  }

  Navbar.prototype = {
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
          <a class="btn btn-mini" href="#" rel="navbar-inverse">Inverse</a>\
          <span class="btn-group">\
            <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#">\
              Position\
              <span class="caret"></span>\
            </a>\
            <ul class="dropdown-menu">\
              <li class="active">\
                <a href="#" rel="">Default</a>\
              </li>\
              <li class="">\
                <a href="#" rel="navbar-static-top">Static to Top</a>\
              </li>\
              <li class="">\
                <a href="#" rel="navbar-fixed-top">Fixed to Top</a>\
              </li>\
              <li class="">\
                <a href="#" rel="navbar-fixed-bottom">Fixed to Bottom</a>\
              </li>\
            </ul>\
          </span>\
        </span>\
        <div class="preview">Navbar</div>\
        <div class="view">\
          <div class="navbar">\
            <div class="navbar-inner">\
              <div class="container-fluid">\
                <a data-target=".navbar-responsive-collapse" data-toggle="collapse" class="btn btn-navbar">\
                  <span class="icon-bar"></span>\
                  <span class="icon-bar"></span>\
                  <span class="icon-bar"></span>\
                </a>\
                <a href="#" class="brand">Title</a>\
                <div class="nav-collapse collapse navbar-responsive-collapse">\
                  <ul class="nav">\
                    <li class="active">\
                      <a href="#">Home</a>\
                    </li>\
                    <li>\
                      <a href="#">Link</a>\
                    </li>\
                    <li>\
                      <a href="#">Link</a>\
                    </li>\
                    <li class="dropdown">\
                      <a data-toggle="dropdown" class="dropdown-toggle" href="#">\
                        Dropdown\
                        <b class="caret"></b>\
                      </a>\
                      <ul class="dropdown-menu">\
                        <li>\
                          <a href="#">Action</a>\
                        </li>\
                        <li>\
                          <a href="#">Another Action</a>\
                        </li>\
                        <li>\
                          <a href="#">Action 3</a>\
                        </li>\
                        <li class="divider"></li>\
                        <li class="nav-header">\
                          NAV HEADER\
                        </li>\
                        <li>\
                          <a href="#">Separated Link</a>\
                        </li>\
                        <li>\
                          <a href="#">\
                            One More Separated Link\
                          </a>\
                        </li>\
                      </ul>\
                    </li>\
                  </ul>\
                  <ul class="nav pull-right">\
                    <li>\
                      <a href="#">Link</a>\
                    </li>\
                    <li class="divider-vertical"></li>\
                    <li class="dropdown">\
                      <a data-toggle="dropdown" class="dropdown-toggle" href="#">\
                        Dropdown\
                        <b class="caret"></b>\
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
                          <a href="#">\
                            Something Else Here\
                          </a>\
                        </li>\
                        <li class="divider"></li>\
                        <li>\
                          <a href="#">\
                            Separated Link\
                          </a>\
                        </li>\
                      </ul>\
                    </li>\
                  </ul>\
                </div>\
                <!-- /.nav-collapse -->\
              </div>\
            </div>\
            <!-- /navbar-inner -->\
          </div>\
        </div>\
      </div>'
  };

  EditorPlugin.interact.push(new Navbar());
})(EditorPlugin, jQuery)
