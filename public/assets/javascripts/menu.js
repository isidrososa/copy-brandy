jQuery(document).ready(function($){
	var isLateralNavAnimating = false,
      showMenu = false;

  $('.cd-nav a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('body').removeClass('navigation-is-open');
        showMenu = false;
        $('main').scrollTop(target.offset().top);
        return false;
      }
    }
  });

  $('main').scroll(function() {
    if ($(this).scrollTop() < 30 || $(this).scrollTop() > 500) {
      $('.cd-nav-trigger').fadeIn();
    } else {
      $('.cd-nav-trigger').fadeOut();
    }
  });

	//open/close lateral navigation
	$('.cd-nav-trigger').on('click', function(event){
		event.preventDefault();
		// stop if nav animation is running
		if( !isLateralNavAnimating ) {
			if($(this).parents('.csstransitions').length > 0 ) isLateralNavAnimating = true;

      if(showMenu) {
			  $('body').removeClass('navigation-is-open');
        showMenu = false;
      } else {
        $('body').addClass('navigation-is-open');
        setTimeout(function() {
          $('main').scrollTop(0);
        }, 700);
        showMenu = true;

      }

      $('.cd-navigation-wrapper').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				// animation is over
				isLateralNavAnimating = false;
			});
		}
	});
});
