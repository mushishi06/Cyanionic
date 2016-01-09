(function(EditorPlugin, $) {
  function Thumbnail() {
    this.version = "0.1";
    this.name = "breadcrumb";
  }

  Thumbnail.prototype = {
    isThis: function(dom) {
      console.log(dom);
      dom = $(dom);
      return dom.prop("tagName") == "DIV" && dom.hasClass("thumbnail");
    },
    getElts: function(dom) {
      return [
        {tag: "input", key: "src", value: $(dom).find("img").attr("src")},
        {tag: "ckeditor", key: "caption", value: $(dom).find(".caption").html()},
        {tag: "input", key: "action", value: $(dom).find("a").attr("href")}
      ];
    },
    setData: function(dom, key, val) {
      if (key == "src") {
        $(dom).find("img").attr("src", val);
      } else if (key == "caption") {
        $(dom).find(".caption").html(val);
      } else if (key == "action") {
        $(dom).find("a").attr("href", val);
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
        <div class="preview">Thumbnails</div>\
        <div class="view">\
          <ul class="thumbnails">\
            <li class="span4">\
              <div class="thumbnail editor-element">\
                <img alt="300x200" src="img/people.jpg" />\
                <div class="caption">\
                  <h3>Thumbnail label</h3>\
                  <p>\
                    Bacon ipsum dolor sit amet doner ham leberkas short loin\
                    hamburger, flank drumstick corned beef. Doner meatball\
                    venison bresaola biltong chicken. Turkey bacon shoulder\
                    strip steak spare ribs tri-tip. Rump ground round strip\
                    steak kielbasa short loin t-bone. Biltong capicola\
                    corned beef, ribeye chuck andouille sausage ham hock\
                    turkey spare ribs beef tail sirloin shank.\
                  </p>\
                  <p>\
                    <a class="btn" href="#">Action</a>\
                  </p>\
                </div>\
              </div>\
            </li>\
            <li class="span4">\
              <div class="thumbnail editor-element">\
                <img alt="300x200" src="img/city.jpg">\
                <div class="caption">\
                  <h3>Thumbnail label</h3>\
                  <p>\
                    Bacon ipsum dolor sit amet doner ham leberkas short loin\
                    hamburger, flank drumstick corned beef. Doner meatball\
                    venison bresaola biltong chicken. Turkey bacon shoulder\
                    strip steak spare ribs tri-tip. Rump ground round strip\
                    steak kielbasa short loin t-bone. Biltong capicola\
                    corned beef, ribeye chuck andouille sausage ham hock\
                    turkey spare ribs beef tail sirloin shank.\
                  </p>\
                  <p>\
                    <a class="btn btn-primary" href="#">Action</a>\
                  </p>\
                </div>\
              </div>\
            </li>\
            <li class="span4">\
              <div class="thumbnail editor-element">\
                <img alt="300x200" src="img/sports.jpg">\
                <div class="caption">\
                  <h3>Thumbnail label</h3>\
                  <p>\
                    Bacon ipsum dolor sit amet doner ham leberkas short loin\
                    hamburger, flank drumstick corned beef. Doner meatball\
                    venison bresaola biltong chicken. Turkey bacon shoulder\
                    strip steak spare ribs tri-tip. Rump ground round strip\
                    steak kielbasa short loin t-bone. Biltong capicola\
                    corned beef, ribeye chuck andouille sausage ham hock\
                    turkey spare ribs beef tail sirloin shank.\
                  </p>\
                  <p>\
                    <a class="btn btn-primary" href="#">Action</a>\
                  </p>\
                </div>\
              </div>\
            </li>\
          </ul>\
        </div>\
      </div>'
  };
  EditorPlugin.page.push(new Thumbnail());
})(EditorPlugin, jQuery)
