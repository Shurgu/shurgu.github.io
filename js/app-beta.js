(function () {
    if (window.BETA) {
        window.BETA.init($('.draw-container'), $('.draw-container').width(), 350);
        window.BETA.draw('blue');
        window.BETA.animate();
    }
})();