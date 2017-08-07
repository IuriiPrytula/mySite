$(document).ready(function () {

  //Wait for all
  $(function () {

    var imgs = [];
    d = $.Deferred();

    function setPercents(total, current) {
      var percent = Math.ceil(current / total * 100);

      $('.percents').text(percent + '%');

      if (percent >= 100) {
        d.resolve();
      }
    }

    $.each($('*'), function () {
      var $this = $(this),
        img = $this.is('img'),
        background = $this.css('background-image'),
        path = null;

      if (background != 'none') {
        path = background.replace('url("', '').replace('")', '');
        imgs.push(path);
      }

      if (img) {
        path = $this.attr('src');

        if (path) {
          imgs.push(path);
        }
      }
    });

    var percents = 1;

    for (var i = 0; i < imgs.length; i++) {
      var image = $('<img>', {
        attr: {
          src: imgs[i]
        }
      });

      image.on('load', function () {
        setPercents(imgs.length, percents);
        percents++;
      });
    }
    
    d.done(function() {
      $('.preloader').css({
        'display': 'none'
      });
    });
  });

  $('.card').fadeIn(1000);
});