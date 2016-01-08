(function(EditorPlugin, $) {
  function Collapse() {
    this.version = "0.1";
    this.name = "collapse";
  }

  Collapse.prototype = {
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
        <div class="preview">Collapse</div>\
        <div class="view">\
          <div class="accordion" id="myAccordion">\
            <div class="accordion-group">\
              <div class="accordion-heading">\
                <a class="accordion-toggle" data-toggle="collapse" data-parent="#myAccordion" href="#collapseOne">\
                  Group Item #1\
                </a>\
              </div>\
              <div id="collapseOne" class="accordion-body collapse in">\
                <div class="accordion-inner">\
                  Bacon ipsum dolor sit amet doner ham leberkas short loin\
                  hamburger, flank drumstick corned beef. Doner meatball\
                  venison bresaola biltong chicken. Turkey bacon shoulder\
                  strip steak spare ribs tri-tip. Rump ground round strip\
                  steak kielbasa short loin t-bone. Biltong capicola corned\
                  beef, ribeye chuck andouille sausage ham hock turkey spare\
                  ribs beef tail sirloin shank.\
                </div>\
              </div>\
            </div>\
            <div class="accordion-group">\
              <div class="accordion-heading">\
                <a class="accordion-toggle" data-toggle="collapse" data-parent="#myAccordion" href="#collapseTwo">\
                  Group Item #2\
                </a>\
              </div>\
              <div id="collapseTwo" class="accordion-body collapse">\
                <div class="accordion-inner">\
                  Bacon ipsum dolor sit amet doner ham leberkas short loin\
                  hamburger, flank drumstick corned beef. Doner meatball\
                  venison bresaola biltong chicken. Turkey bacon shoulder\
                  strip steak spare ribs tri-tip. Rump ground round strip\
                  steak kielbasa short loin t-bone. Biltong capicola corned\
                  beef, ribeye chuck andouille sausage ham hock turkey spare\
                  ribs beef tail sirloin shank.\
                </div>\
              </div>\
            </div>\
          </div>\
        </div>\
      </div>'
  };

  EditorPlugin.interact.push(new Collapse());
})(EditorPlugin, jQuery)
