import createSnakeController from './snake';
import createApplesController from './apples';
import draw from './drawer';

function createGame(arenaWidth, arenaHeight, speed) {
  return {
    arenaWidth: arenaWidth || 50,
    arenaHeight: arenaHeight || 50,
    drawFrequency: 1000 / speed,
    previousTime: 0,
    acc: 0,
    score: 1,

    prepare: function () {
      const canvas = document.getElementById('canvas');
      this.context = canvas.getContext('2d');
      this.context.scale(canvas.width / this.arenaWidth, canvas.height / this.arenaHeight);
      this.scoreLabel = document.getElementById('score');
      this.scoreLabel.innerHTML = this.score;

      this.snake = createSnakeController(this.arenaWidth, this.arenaHeight);
      this.apples = createApplesController();
    },

    start: function () {
      this.prepare();
      const _snake = this.snake;
      
      document.addEventListener('keydown', function (e) {
        if (e.keyCode === 37) {
          _snake.makeTurn('LEFT');
        }
        if (e.keyCode === 39) {
          _snake.makeTurn('RIGHT');
        }
        if (e.keyCode === 38) {
          _snake.makeTurn('UP');
        }
        if (e.keyCode === 40) {
          _snake.makeTurn('DOWN');
        }
      });
      draw(this.context,this.arenaWidth, this.arenaHeight, this.snake.body, this.apples.apples);
      this.loop();
    },

    loop: function () {
      window.requestAnimationFrame(this.iteration.bind(this));
    },

    iteration: function (time) {
      this.acc += time - this.previousTime;
      this.previousTime = time;

      if (this.acc >= this.drawFrequency) {
        this.acc = 0;
        const apple = this.snake.move(this.apples.apples);
        if (this.checkCollision()) return;
        if(apple) {
          this.increaseScore(apple);
          this.apples.removeApple(apple);
        }
        this.apples.generateApples(this.arenaWidth, this.arenaHeight, this.snake.body);
        draw(this.context,this.arenaWidth, this.arenaHeight, this.snake.body, this.apples.apples);
      }

      this.loop();
    },

    checkCollision: function () {
      if (this.snake.body.length > 4) {
        const head = this.snake.body[0];
        const headlessBody = this.snake.body.slice(1);
        return headlessBody.filter((cell) => head.x === cell.x && head.y === cell.y).length > 0;
      }
    },

    increaseScore: function (apple) {
      if (apple) {
        this.score++;
        this.scoreLabel.innerHTML = this.score;
      }
    }
  }
}

const game = createGame(15, 15, 10);
game.start();