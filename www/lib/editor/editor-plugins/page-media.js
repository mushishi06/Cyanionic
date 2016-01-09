(function(EditorPlugin, $) {
  function Media() {
    this.version = "0.1";
    this.name = "media";
  }

  Media.prototype = {
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
          <a class="btn btn-mini" href="#" rel="well">Well</a>\
        </span>\
        <div class="preview">Media Object</div>\
        <div class="view">\
          <div class="media">\
            <a href="#" class="pull-left">\
              <img src="img/a_002.jpg" class="media-object" />\
            </a>\
            <div class="media-body">\
              <h4 class="media-heading">\
                Nested Media Header\
              </h4>\
              Bacon ipsum dolor sit amet doner ham leberkas short loin hamburger,\
              flank drumstick corned beef. Doner meatball venison bresaola biltong\
              chicken. Turkey bacon shoulder strip steak spare ribs tri-tip. Rump\
              ground round strip steak kielbasa short loin t-bone. Biltong\
              capicola corned beef, ribeye chuck andouille sausage ham hock turkey\
              spare ribs beef tail sirloin shank.\
            </div>\
          </div>\
        </div>\
      </div>'
  };

  EditorPlugin.page.push(new Media());
})(EditorPlugin, jQuery)
