(function () {
	if (window.ALPHA) {
		window.ALPHA.init($('.draw-container'), $('.draw-container').width(), 350);
		window.ALPHA.draw('green');
		window.ALPHA.animate();
	}
})();