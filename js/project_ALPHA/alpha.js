function AlphaTest() {}

AlphaTest.prototype = {
    $canvas: null,
    init: function ($container, width, height) {
        if ($container) {
            $container.append('<canvas class="alpha-canvas"/>');
        } else {
            $('body').append('<canvas class="alpha-canvas"/>');
        }
        this.$canvas = $('.alpha-canvas');

        if (width) {
            this.$canvas.attr('width', width);
        }

        if (height) {
            this.$canvas.attr('height', height);
        }

        return this.$canvas;
    },

    destroy: function () {
        $('.alpha-canvas').remove();
    },

    draw: function (color) {
        var ctx = this.$canvas[0].getContext('2d');
        if (color) {
            ctx.fillStyle = color;
        } else {
            ctx.fillStyle = 'grey';
        }
        ctx.fillRect(0, 0, this.$canvas.width(), this.$canvas.height());
    },

    animate: function () {
        window.requestAnimationFrame($.proxy(this.animate, this));
        this.draw();
    }
};

(function () {
    window.ALPHA = new AlphaTest();
})();