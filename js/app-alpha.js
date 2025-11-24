(function () {
    if (window.ALPHA) {
        var container = document.querySelector('.draw-container');
        window.ALPHA.init(container, container.offsetWidth, 350);
        window.ALPHA.draw('green');
        window.ALPHA.animate();
    }
})();