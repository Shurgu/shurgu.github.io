function AlphaTest() { }

AlphaTest.prototype = {
    $canvas: null,
    $width: 250,
    $height: 250,
    $bgColor: 'grey',
    // init: function ($container, width, height, bgColor) {
    init: function () {
        if (arguments[0]) {
            arguments[0].append('<canvas class="alpha-canvas"/>');
        } else {
            $('body').append('<canvas class="alpha-canvas"/>');
        }

        if (arguments[1]) {
            this.$width = arguments[1];
        }

        if (arguments[2]) {
            this.$height = arguments[2];
        }

        if (arguments[3]) {
            this.$bgColor = arguments[3];
        }
        this.$canvas = $('.alpha-canvas');
        this.$canvas.attr('width', this.$width);
        this.$canvas.attr('height', this.$height);

        return this.$canvas;
    },

    destroy: function () {
        $('.alpha-canvas').remove();
    },

    draw: function (color) {
        var ctx = this.$canvas[0].getContext('2d');

        if (color) {
            this.$bgColor = color;
        }

        ctx.fillStyle = this.$bgColor;
        ctx.fillRect(0, 0, this.$canvas.width(), this.$canvas.height());

        var time = new Date().getTime() * 0.002;
        var x = Math.sin(time) * (Math.round(this.$width / 2) - 10) + Math.round(this.$width / 2);
        var y = Math.cos(time * 0.9) * (Math.round(this.$height / 2) - 10) + Math.round(this.$height / 2);

        ctx.fillStyle = 'rgb(0,255,0)';
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    },

    animate: function () {
        window.requestAnimationFrame($.proxy(this.animate, this));
        this.draw();
    }
};

(function () {
    window.ALPHA = new AlphaTest();
})();