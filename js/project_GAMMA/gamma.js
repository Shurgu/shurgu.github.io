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

    $colors: ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta', 'orange'],
    $selectedBall: null,

    init: function (container) {
        this.$balls = [];
        this.$selectedBall = null;
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

        var rect = this.$canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var gridPos = this.getGridCoordinates(x, y);

        if (!gridPos) return;

        // Check if clicked on a ball
        var clickedBall = null;
        for (var i = 0; i < this.$balls.length; i++) {
            if (this.$balls[i].x === gridPos.x && this.$balls[i].y === gridPos.y) {
                clickedBall = this.$balls[i];
                break;
            }
        }

        if (clickedBall) {
            // Select the ball
            this.$selectedBall = clickedBall;
            this.render();
        } else if (this.$selectedBall) {
            // Try to move selected ball to empty spot
            if (this.findPath(this.$selectedBall, gridPos)) {
                this.moveBall(this.$selectedBall, gridPos);
            }
        }
    },

    findPath: function (start, end) {
        // BFS to find if there is a path
        var queue = [{ x: start.x, y: start.y }];
        var visited = {};
        visited[start.x + ',' + start.y] = true;

        // Helper to check if a cell is blocked by a ball
        var isBlocked = (function (x, y) {
            for (var i = 0; i < this.$balls.length; i++) {
                if (this.$balls[i].x === x && this.$balls[i].y === y) return true;
            }
            return false;
        }).bind(this);

        var dirs = [
            { x: 0, y: -1 }, // Up
            { x: 0, y: 1 },  // Down
            { x: -1, y: 0 }, // Left
            { x: 1, y: 0 }   // Right
        ];

        while (queue.length > 0) {
            var curr = queue.shift();

            if (curr.x === end.x && curr.y === end.y) {
                return true;
            }

            for (var i = 0; i < dirs.length; i++) {
                var nextX = curr.x + dirs[i].x;
                var nextY = curr.y + dirs[i].y;

                // Check bounds
                if (nextX >= 0 && nextX < this.$gridSize && nextY >= 0 && nextY < this.$gridSize) {
                    var key = nextX + ',' + nextY;
                    if (!visited[key]) {
                        // Check if blocked (unless it's the destination, which we know is empty from handleInput logic)
                        // Actually handleInput ensures 'clickedBall' is null, so end is empty.
                        // But we must traverse only empty cells.
                        if (!isBlocked(nextX, nextY) || (nextX === end.x && nextY === end.y)) {
                            visited[key] = true;
                            queue.push({ x: nextX, y: nextY });
                        }
                    }
                }
            }
        }

        return false;
    },

    moveBall: function (ball, target) {
        ball.x = target.x;
        ball.y = target.y;
        this.$selectedBall = null;

        // Turn Logic:
        var linesCleared = this.checkLines();

        if (linesCleared) {
            this.render();
        } else {
            this.spawnBalls(3);
            this.checkLines();
            this.checkGameOver();
            this.render();
        }
    },

    checkLines: function () {
        var lines = [];
        var grid = [];

        // Helper to build grid for easier access
        for (var i = 0; i < this.$gridSize; i++) {
            grid[i] = new Array(this.$gridSize).fill(null);
        }
        for (var i = 0; i < this.$balls.length; i++) {
            grid[this.$balls[i].x][this.$balls[i].y] = this.$balls[i];
        }

        // Check horizontal, vertical, diagonal /, diagonal \
        var directions = [
            { x: 1, y: 0 },  // Horizontal
            { x: 0, y: 1 },  // Vertical
            { x: 1, y: 1 },  // Diagonal \
            { x: 1, y: -1 }  // Diagonal /
        ];

        for (var d = 0; d < directions.length; d++) {
            var dx = directions[d].x;
            var dy = directions[d].y;

            // Iterate all cells
            for (var x = 0; x < this.$gridSize; x++) {
                for (var y = 0; y < this.$gridSize; y++) {
                    var ball = grid[x][y];
                    if (!ball) continue;

                    // Check consecutive balls
                    var currentLine = [ball];
                    var nextX = x + dx;
                    var nextY = y + dy;

                    while (
                        nextX >= 0 && nextX < this.$gridSize &&
                        nextY >= 0 && nextY < this.$gridSize &&
                        grid[nextX][nextY] &&
                        grid[nextX][nextY].color === ball.color
                    ) {
                        currentLine.push(grid[nextX][nextY]);
                        nextX += dx;
                        nextY += dy;
                    }

                    if (currentLine.length >= 5) {
                        // Found a line!

                        // Optimization: Checked only if previous cell was NOT match to avoid duplicates
                        var prevX = x - dx;
                        var prevY = y - dy;
                        var isStartOfLine = true;
                        if (
                            prevX >= 0 && prevX < this.$gridSize &&
                            prevY >= 0 && prevY < this.$gridSize &&
                            grid[prevX][prevY] &&
                            grid[prevX][prevY].color === ball.color
                        ) {
                            isStartOfLine = false;
                        }

                        if (isStartOfLine) {
                            for (var k = 0; k < currentLine.length; k++) {
                                lines.push(currentLine[k]);
                            }
                        }
                    }
                }
            }
        }

        if (lines.length > 0) {
            // Remove balls
            var uniqueLines = [];
            for (var i = 0; i < lines.length; i++) {
                if (uniqueLines.indexOf(lines[i]) === -1) {
                    uniqueLines.push(lines[i]);
                }
            }

            for (var i = 0; i < uniqueLines.length; i++) {
                var index = this.$balls.indexOf(uniqueLines[i]);
                if (index > -1) {
                    this.$balls.splice(index, 1);
                }
            }
            return true;
        }
        return false;
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
        this.$selectedBall = null;
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

            // Highlight selected ball
            if (this.$selectedBall === ball) {
                this.$ctx.strokeStyle = '#000';
                this.$ctx.lineWidth = 3;
                this.$ctx.stroke();

                // Add an inner white glow/highlight to make it more obvious
                this.$ctx.strokeStyle = '#fff';
                this.$ctx.lineWidth = 1;
                this.$ctx.stroke();
            }
        }
    }
};

(function () {
    window.GAMMA = new GammaGame();
})();
