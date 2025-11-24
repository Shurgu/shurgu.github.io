(function () {
    if (window.BETA) {
        var container = document.querySelector('.draw-container');
        window.BETA.init(container, container.offsetWidth, 350);
        window.BETA.draw('white');
        window.BETA.animate();
    }
})();