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
    $colors: ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta', 'orange'],

    init: function (container) {
        this.$balls = [];
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

        // Game Over Overlay
        this.$gameOverOverlay = document.createElement('div');
        this.$gameOverOverlay.style.position = 'absolute';
        this.$gameOverOverlay.style.top = '0';
        this.$gameOverOverlay.style.left = '0';
        this.$gameOverOverlay.style.width = this.$width + 'px';
        this.$gameOverOverlay.style.height = this.$height + 'px';
        this.$gameOverOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        this.$gameOverOverlay.style.color = 'white';
        this.$gameOverOverlay.style.fontSize = '40px';
        this.$gameOverOverlay.style.fontWeight = 'bold';
        this.$gameOverOverlay.style.display = 'none';
        this.$gameOverOverlay.style.flexDirection = 'column';
        this.$gameOverOverlay.style.alignItems = 'center';
        this.$gameOverOverlay.style.justifyContent = 'center';
        this.$gameOverOverlay.style.zIndex = '10';

        var gameOverText = document.createElement('div');
        gameOverText.innerText = 'GAME OVER';
        this.$gameOverOverlay.appendChild(gameOverText);

        var restartBtn = document.createElement('button');
        restartBtn.innerText = 'Start new';
        restartBtn.style.marginTop = '20px';
        restartBtn.style.padding = '10px 20px';
        restartBtn.style.fontSize = '16px';
        restartBtn.style.cursor = 'pointer';

        restartBtn.addEventListener('click', function () {
            self.restart();
        });

        this.$gameOverOverlay.appendChild(restartBtn);

        if (container) {
            container.style.position = 'relative';
            container.appendChild(this.$gameOverOverlay);
        } else {
            document.body.appendChild(this.$gameOverOverlay);
        }

        var self = this;
        this.$canvas.addEventListener('click', function (e) {
            self.handleInput(e);
        });

        this.spawnBalls(3);
        this.render();

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
    },

    handleInput: function (e) {
        if (this.$gameOverOverlay.style.display !== 'none') return;

        // For now, any click triggers spawning 3 new balls
        // In the future, this will handle selecting and moving balls
        this.spawnBalls(3);
        this.render();
    },

    getGridCoordinates: function (x, y) {
        var gx = Math.floor(x / this.$cellSize);
        var gy = Math.floor(y / this.$cellSize);

        if (gx >= 0 && gx < this.$gridSize && gy >= 0 && gy < this.$gridSize) {
            return { x: gx, y: gy };
        }
        return null;
    },

    spawnBalls: function (count) {
        var emptyCells = this.getEmptyCells();
        if (emptyCells.length === 0) return;

        for (var i = 0; i < count; i++) {
            if (emptyCells.length === 0) break;
            var randomIndex = Math.floor(Math.random() * emptyCells.length);
            var cell = emptyCells.splice(randomIndex, 1)[0];
            this.$balls.push({
                x: cell.x,
                y: cell.y,
                color: this.getRandomColor()
            });
        }

        this.checkGameOver();
    },

    checkGameOver: function () {
        if (this.$balls.length >= this.$gridSize * this.$gridSize) {
            this.showGameOver();
        }
    },

    showGameOver: function () {
        if (this.$gameOverOverlay) {
            this.$gameOverOverlay.style.display = 'flex';
        }
    },

    restart: function () {
        this.$balls = [];
        this.$gameOverOverlay.style.display = 'none';
        this.spawnBalls(3);
        this.render();
    },

    getEmptyCells: function () {
        var emptyCells = [];
        for (var x = 0; x < this.$gridSize; x++) {
            for (var y = 0; y < this.$gridSize; y++) {
                var occupied = false;
                for (var i = 0; i < this.$balls.length; i++) {
                    if (this.$balls[i].x === x && this.$balls[i].y === y) {
                        occupied = true;
                        break;
                    }
                }
                if (!occupied) {
                    emptyCells.push({ x: x, y: y });
                }
            }
        }
        return emptyCells;
    },

    getRandomColor: function () {
        return this.$colors[Math.floor(Math.random() * this.$colors.length)];
    },

    render: function () {
        this.drawGrid();
        this.drawBalls();
    },

    drawBalls: function () {
        if (!this.$ctx) return;
        for (var i = 0; i < this.$balls.length; i++) {
            var ball = this.$balls[i];
            var cx = ball.x * this.$cellSize + this.$cellSize / 2;
            var cy = ball.y * this.$cellSize + this.$cellSize / 2;
            var radius = this.$cellSize / 2 - 10;

            this.$ctx.fillStyle = ball.color;
            this.$ctx.beginPath();
            this.$ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            this.$ctx.fill();
        }
    }
};

(function () {
    window.GAMMA = new GammaGame();
})();
