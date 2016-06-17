$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

// Scroll Top button
$(document).ready(function() {
  // FadeIn or FadeOut scroll button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 400) {
      $('#scroll').fadeIn();
    } else {
      $('#scroll').fadeOut();
    }
  });

  // Add scroll event
  $('#scroll').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 1000);
    return false;
  });
});
