$(document).ready(function () {

  //Preloader
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

    d.done(function () {
      $('.preloader').css({
        'display': 'none',
      });
      $('.wrapper').css({
        'display' : 'block'
      });
      $('.card').fadeIn(1000);
      $('.arrow-down-link').fadeIn(3000);
    });
  });

  //SoftScroll
  $(function () {
    $('a[href*="#"]:not([href="#"])').click(function (e) {
      e.preventDefault();
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });

  //ScrollParallax
  $(window).scroll(function () {
    var
      wScroll = $(window).scrollTop();

    function scrollParallax(block, strafeAmount) {
      var 
        strafe = -strafeAmount + '%',
        transformString = 'translate3d(0,' + strafe + ', 0)';

        block.css({
          'transform': transformString
        });
    }

    scrollParallax($('.hero__bg'), -wScroll/40);
  });

  //MouseParallax
  var  layer = $('.parallax').find('.parallax__layer');

  layer.map(function(key, value) {
        var bottomPos = (window.innerHeight / 2) * (key / 100);

        $(value).css({
          'transform' : 'translate3d(0, 0, 0)'
        });
      });

  $(window).mousemove(function (e) { 
    var
      mouseX = e.pageX,
      mouseY = e.pageY,
      w = (window.innerWidth / 2) - mouseX,
      h = window.innerHeight / 2 - mouseY;
     
      
      layer.map(function(key, value) {
        var 
          bottomPos = (window.innerHeight / 2) * (key / 100),
          widthPos = w * (key / 100),
          heightPos = h * (key / 100);
        console.log(value);
        $(value).css({
          'bottom' : '-' + bottomPos + 'px',
          'transform' : 'translate3d(' + widthPos + 'px, ' + heightPos + 'px, 0)'
        });
      });
  });
});