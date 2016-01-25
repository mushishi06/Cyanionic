(function(EditorPlugin, $) {
  function Carousel() {
    this.version = "0.1";
    this.name = "carousel";
  }

  Carousel.prototype = {
    isThis: function(dom) {
      console.log(dom);
      dom = $(dom);
      return dom.prop("tagName") == "DIV" && dom.hasClass("carousel");
    },
    getElts: function(dom) {
      var items = $(dom).find(".carousel-inner").find(".item");
      var elts = [];

      for (var i = 0 ; i < items.length ; ++i) {
        var item = $(items.get(i));

        elts.push({tag: "input", key: "img-" + i, value: item.find("img").attr("src")});
        elts.push({tag: "ckeditor", key: "label-" + i, value: item.find(".carousel-caption").html()});
      }
      return elts;
    },
    setData: function(dom, key, val) {
      var items = $(dom).find(".carousel-inner").find(".item");

      if (key.substr(0, 3) == "img") {
        var id = +key.substr(4);
        var item = $(items.get(id));

        item.find("img").attr("src", val);
      } else if (key.substr(0, 5) == "label") {
        var id = +key.substr(6);
        var item = $(items.get(id));

        item.find(".carousel-caption").html(val);
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
        <div class="preview">Carousel</div>\
        <div class="view">\
          <div class="carousel slide editor-element" id="myCarousel">\
            <ol class="carousel-indicators">\
              <li class="active" data-slide-to="0" data-target="#myCarousel"></li>\
              <li data-slide-to="1" data-target="#myCarousel" class=""></li>\
              <li data-slide-to="2" data-target="#myCarousel" class=""></li>\
            </ol>\
            <div class="carousel-inner">\
              <div class="item active">\
                <img alt="" src="img/1.jpg" />\
                <div class="carousel-caption">\
                  <h4>First Thumbnail Label</h4>\
                  <p>\
                    Bacon ipsum dolor sit amet doner ham leberkas short loin\
                    hamburger, flank drumstick corned beef. Doner meatball\
                    venison bresaola biltong chicken. Turkey bacon shoulder strip\
                    steak spare ribs tri-tip. Rump ground round strip steak\
                    kielbasa short loin t-bone. Biltong capicola corned beef, ribeye chuck\
                    andouille sausage ham hock turkey spare ribs beef tail\
                    sirloin shank.\
                  </p>\
                </div>\
              </div>\
              <div class="item">\
                <img alt="" src="img/2.jpg" />\
                <div class="carousel-caption">\
                  <h4>Second Thumbnail Label</h4>\
                  <p>\
                    Bacon ipsum dolor sit amet doner ham leberkas short loin\
                    hamburger, flank drumstick corned beef. Doner meatball\
                    venison bresaola biltong chicken. Turkey bacon shoulder strip\
                    steak spare ribs tri-tip. Rump ground round strip steak\
                    kielbasa short loin t-bone. Biltong capicola corned beef, ribeye chuck\
                    andouille sausage ham hock turkey spare ribs beef tail\
                    sirloin shank.\
                  </p>\
                </div>\
              </div>\
              <div class="item">\
                <img alt="" src="img/3.jpg" />\
                <div class="carousel-caption">\
                  <h4>Third Thumbnail Label</h4>\
                  <p>\
                    Bacon ipsum dolor sit amet doner ham leberkas short loin\
                    hamburger, flank drumstick corned beef. Doner meatball\
                    venison bresaola biltong chicken. Turkey bacon shoulder strip\
                    steak spare ribs tri-tip. Rump ground round strip steak\
                    kielbasa short loin t-bone. Biltong capicola corned beef, ribeye chuck\
                    andouille sausage ham hock turkey spare ribs beef tail\
                    sirloin shank.\
                  </p>\
                </div>\
              </div>\
            </div>\
            <a data-slide="prev" href="#myCarousel" class="left carousel-control">‹</a>\
            <a data-slide="next" href="#myCarousel" class="right carousel-control">›</a>\
          </div>\
        </div>\
      </div>'
  };

  EditorPlugin.interact.push(new Carousel());
})(EditorPlugin, jQuery)
