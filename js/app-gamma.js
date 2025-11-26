(function () {
    if (window.GAMMA) {
        var container = document.querySelector('.draw-container');
        if (container) {
            window.GAMMA.init(container);
            window.GAMMA.drawGrid();
        }
    }
})();
