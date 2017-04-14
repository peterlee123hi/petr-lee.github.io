$(function() {
	if (window.innerWidth >= 600) {
		$(document).on('mousemove', '.modal', function(event) {
	    var halfW = (this.clientWidth / 2);
	    var halfH = (this.clientHeight / 2);
	    var coorX = (halfW - (event.screenX - this.offsetLeft));
	    var coorY = (halfH - (event.screenY - this.offsetTop));
	    var degX  = ((coorY / halfH) * 2) + 'deg';
	    var degY  = ((coorX / halfW) * -2) + 'deg';

	    $(this).css('transform', function() {
	      return 'perspective(600px) translate3d(0, -2px, 0) scale(1.1) rotateX('+ degX +') rotateY('+ degY +')';
	    });
	  });
	}
});
