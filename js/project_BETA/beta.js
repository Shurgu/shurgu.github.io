/*global AlphaTest */

function BetaTest() {}

BetaTest.prototype = Object.create(AlphaTest.prototype);

BetaTest.prototype.draw = function (color) {
    var ctx = this.$canvas[0].getContext('2d');

    if (color) {
        this.$bgColor = color;
    }

    ctx.fillStyle = this.$bgColor;
    ctx.fillRect(0, 0, this.$canvas.width(), this.$canvas.height());
};

(function () {
    window.BETA = new BetaTest();
})();