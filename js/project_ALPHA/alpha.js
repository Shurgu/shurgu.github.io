function AlphaTest() {}

AlphaTest.prototype.init = function () {
	$('body').append('<canvas id="alpha-canvas"/>');
};

(function () {
	window.ALPHA = new AlphaTest();
})();