/*global AlphaTest */

function BetaTest() {}

BetaTest.prototype = Object.create(AlphaTest.prototype);

BetaTest.prototype.x = -10;
BetaTest.prototype.delayedX = -10;

BetaTest.prototype.draw = function (color) {
    var ctx = this.$canvas[0].getContext('2d');

    if (color) {
        this.$bgColor = color;
    }

    ctx.fillStyle = this.$bgColor;
    //ctx.fillRect(0, 0, this.$canvas.width(), this.$canvas.height());

    var time = new Date().getTime() * 0.002;
    this.x = this.x + 1;
    if (this.x > this.$width + 10) {
        this.x = -10;
    }
    var y = Math.cos(time) * (Math.round(this.$height / 2) - 10) + Math.round(this.$height / 2);

    ctx.fillStyle = 'rgb(150,0,150)';
    this.drawDot(this.x, y, ctx);

    setTimeout($.proxy(function (obj) {
        obj.c.fillStyle = 'rgb(150,150,150)';
        this.drawDot(obj.a, obj.b, obj.c);
    }, this, {
        a: this.x,
        b: y,
        c: ctx
    }), 1000);

};

BetaTest.prototype.drawDot = function (x, y, ctx) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
};

(function () {
    window.BETA = new BetaTest();
})();