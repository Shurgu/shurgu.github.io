function AlphaTest() {}

AlphaTest.prototype = {
    $canvas: null,
    init: function ($container) {
        if ($container) {
            $container.append('<canvas class="alpha-canvas"/>');
        } else {
            $('body').append('<canvas class="alpha-canvas"/>');
        }
        this.$canvas = $('.alpha-canvas');
        return this.$canvas;
    },

    destroy: function () {
        $('.alpha-canvas').remove();
    },

    drawUI: function () {
        var ctx = this.$canvas[0].getContext('2d');
        ctx.fillStyle = 'grey';
        ctx.fillRect(0, 0, this.$canvas.width(), this.$canvas.height());
    }
};

(function () {
    window.ALPHA = new AlphaTest();
})();