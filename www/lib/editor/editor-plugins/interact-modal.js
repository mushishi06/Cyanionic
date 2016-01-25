(function(EditorPlugin, $) {
  function Modal() {
    this.version = "0.1";
    this.name = "modal";
  }

  Modal.prototype = {
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
        <div class="preview">Modal</div>\
        <div class="view">\
          <!-- Button to trigger modal -->\
          <a id="myModalLink" href="#myModalContainer" role="button" class="btn" data-toggle="modal">\
            Launch Demo Modal\
          </a>\
          <!-- Modal -->\
          <div id="myModalContainer" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
            <div class="modal-header">\
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\
                ×\
              </button>\
              <h3 id="myModalLabel">Title</h3>\
            </div>\
            <div class="modal-body">\
              <p>\
                Bacon ipsum dolor sit amet doner ham leberkas short loin\
                hamburger, flank drumstick corned beef. Doner meatball venison\
                bresaola biltong chicken. Turkey bacon shoulder strip steak\
                spare ribs tri-tip. Rump ground round strip steak kielbasa short\
                loin t-bone. Biltong capicola corned beef, ribeye chuck\
                andouille sausage ham hock turkey spare ribs beef tail sirloin\
                shank.\
              </p>\
            </div>\
            <div class="modal-footer">\
              <button class="btn" data-dismiss="modal" aria-hidden="true">\
                Cancel\
              </button>\
              <button class="btn btn-primary">\
                Save Changes\
              </button>\
            </div>\
          </div>\
        </div>\
      </div>'
  };

  EditorPlugin.interact.push(new Modal());
})(EditorPlugin, jQuery)
