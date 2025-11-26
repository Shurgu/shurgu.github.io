function GammaGame() { }

GammaGame.prototype = {
    $canvas: null,
    $ctx: null,
    $width: 450,
    $height: 450,
    $cellSize: 50,
    $gridSize: 9,
    $bgColor: '#f0f0f0',
    $gridColor: '#ccc',

    init: function (container) {
        this.$canvas = document.createElement('canvas');
        this.$canvas.className = 'gamma-canvas';
        this.$canvas.width = this.$width;
        this.$canvas.height = this.$height;

        if (container) {
            container.appendChild(this.$canvas);
        } else {
            document.body.appendChild(this.$canvas);
        }

        this.$ctx = this.$canvas.getContext('2d');
        return this.$canvas;
    },

    drawGrid: function () {
        if (!this.$ctx) return;

        // Fill background
        this.$ctx.fillStyle = this.$bgColor;
        this.$ctx.fillRect(0, 0, this.$width, this.$height);

        // Draw grid lines
        this.$ctx.strokeStyle = this.$gridColor;
        this.$ctx.lineWidth = 1;

        this.$ctx.beginPath();

        // Vertical lines
        for (var x = 0; x <= this.$width; x += this.$cellSize) {
            this.$ctx.moveTo(x, 0);
            this.$ctx.lineTo(x, this.$height);
        }

        // Horizontal lines
        for (var y = 0; y <= this.$height; y += this.$cellSize) {
            this.$ctx.moveTo(0, y);
            this.$ctx.lineTo(this.$width, y);
        }

        this.$ctx.stroke();
    }
};

(function () {
    window.GAMMA = new GammaGame();
})();
