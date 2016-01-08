(function(EditorPlugin, $) {
  function Tabs() {
    this.version = "0.1";
    this.name = "tabs";
  }

  Tabs.prototype = {
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
          <span class="btn-group">\
            <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#">\
              Position\
              <span class="caret"></span>\
            </a>\
            <ul class="dropdown-menu">\
              <li class="active"><a href="#" rel="">Default</a></li>\
              <li class=""><a href="#" rel="tabs-below">Bottom</a></li>\
              <li class=""><a href="#" rel="tabs-left">Left</a></li>\
              <li class=""><a href="#" rel="tabs-right">Right</a></li>\
            </ul>\
          </span>\
        </span>\
        <div class="preview">Tabs</div>\
        <div class="view">\
          <div class="tabbable" id="myTabs">\
            <!-- Only required for left/right tabs -->\
            <ul class="nav nav-tabs">\
              <li class="active">\
                <a href="#tab1" data-toggle="tab">\
                  Section 1\
                </a>\
              </li>\
              <li>\
                <a href="#tab2" data-toggle="tab">\
                  Section 2\
                </a>\
              </li>\
            </ul>\
            <div class="tab-content">\
              <div class="tab-pane active" id="tab1">\
                <p>\
                  Bacon ipsum dolor sit amet doner ham leberkas short loin\
                  hamburger, flank drumstick corned beef. Doner meatball\
                  venison bresaola biltong chicken. Turkey bacon shoulder\
                  strip steak spare ribs tri-tip. Rump ground round strip\
                  steak kielbasa short loin t-bone. Biltong capicola corned\
                  beef, ribeye chuck andouille sausage ham hock turkey spare\
                  ribs beef tail sirloin shank.\
                </p>\
              </div>\
              <div class="tab-pane" id="tab2">\
                <p>\
                  Bacon ipsum dolor sit amet doner ham leberkas short loin\
                  hamburger, flank drumstick corned beef. Doner meatball\
                  venison bresaola biltong chicken. Turkey bacon shoulder\
                  strip steak spare ribs tri-tip. Rump ground round strip\
                  steak kielbasa short loin t-bone. Biltong capicola corned\
                  beef, ribeye chuck andouille sausage ham hock turkey spare\
                  ribs beef tail sirloin shank.\
                </p>\
              </div>\
            </div>\
          </div>\
        </div>\
      </div>'
  };

  EditorPlugin.interact.push(new Tabs());
})(EditorPlugin, jQuery)
