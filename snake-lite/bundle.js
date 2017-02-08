(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

exports.default = function () {
  return {
    apples: [],

    generateApples: function generateApples(arenaWidth, arenaHeight, snakeBody) {
      var _this = this;

      if (this.apples.length === 0) {
        (function () {
          var x = getRandomInt(0, arenaWidth);
          var y = getRandomInt(0, arenaHeight);

          var overlap = snakeBody.find(function (point) {
            return point.x === x && point.y === y;
          });

          if (!overlap) {
            _this.apples = [{ x: x, y: y }];
          }
        })();
      }
    },

    removeApple: function removeApple() {
      this.apples = [];
    }
  };
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = draw;
function drawArena(context, arenaWidth, arenaHeight) {
  context.fillStyle = 'white';
  context.fillRect(0, 0, arenaWidth, arenaHeight);
}

function drawSnake(context, snakeBody) {
  context.fillStyle = 'black';
  snakeBody.forEach(function (cell) {
    return context.fillRect(cell.x, cell.y, 1, 1);
  });
}

function drawApples(context, apples) {
  context.fillStyle = 'red';
  apples.forEach(function (apple) {
    return context.fillRect(apple.x, apple.y, 1, 1);
  });
}

function draw(context, arenaWidth, arenaHeight, snakeBody, apples) {
  drawArena(context, arenaWidth, arenaHeight);
  drawSnake(context, snakeBody);
  drawApples(context, apples);
}

},{}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _snake2 = require('./snake');

var _snake3 = _interopRequireDefault(_snake2);

var _apples = require('./apples');

var _apples2 = _interopRequireDefault(_apples);

var _drawer = require('./drawer');

var _drawer2 = _interopRequireDefault(_drawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createGame(arenaWidth, arenaHeight, speed) {
  return {
    arenaWidth: arenaWidth || 50,
    arenaHeight: arenaHeight || 50,
    drawFrequency: 1000 / speed,
    previousTime: 0,
    acc: 0,
    score: 1,

    prepare: function prepare() {
      var canvas = document.getElementById('canvas');
      this.context = canvas.getContext('2d');
      this.context.scale(canvas.width / this.arenaWidth, canvas.height / this.arenaHeight);
      this.scoreLabel = document.getElementById('score');
      this.scoreLabel.innerHTML = this.score;

      this.snake = (0, _snake3.default)(this.arenaWidth, this.arenaHeight);
      this.apples = (0, _apples2.default)();
    },

    start: function start() {
      this.prepare();
      var _snake = this.snake;

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
      (0, _drawer2.default)(this.context, this.arenaWidth, this.arenaHeight, this.snake.body, this.apples.apples);
      this.loop();
    },

    loop: function loop() {
      window.requestAnimationFrame(this.iteration.bind(this));
    },

    iteration: function iteration(time) {
      this.acc += time - this.previousTime;
      this.previousTime = time;

      if (this.acc >= this.drawFrequency) {
        this.acc = 0;
        var apple = this.snake.move(this.apples.apples);
        if (this.checkCollision()) return;
        if (apple) {
          this.increaseScore(apple);
          this.apples.removeApple(apple);
        }
        this.apples.generateApples(this.arenaWidth, this.arenaHeight, this.snake.body);
        (0, _drawer2.default)(this.context, this.arenaWidth, this.arenaHeight, this.snake.body, this.apples.apples);
      }

      this.loop();
    },

    checkCollision: function checkCollision() {
      var _this = this;

      if (this.snake.body.length > 4) {
        var _ret = function () {
          var head = _this.snake.body[0];
          var headlessBody = _this.snake.body.slice(1);
          return {
            v: headlessBody.filter(function (cell) {
              return head.x === cell.x && head.y === cell.y;
            }).length > 0
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    },

    increaseScore: function increaseScore(apple) {
      if (apple) {
        this.score++;
        this.scoreLabel.innerHTML = this.score;
      }
    }
  };
}

var game = createGame(15, 15, 10);
game.start();

},{"./apples":1,"./drawer":2,"./snake":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (arenaWidth, arenaHeight) {
  return {
    width: arenaWidth,
    height: arenaHeight,
    body: [{ x: 0, y: 0 }],
    direction: 'DOWN',
    newDirection: null,

    move: function move(apples) {
      if (this.newDirection) {
        this.direction = this.newDirection;
        this.newDirection = null;
      }

      var _body$ = this.body[0],
          x = _body$.x,
          y = _body$.y;


      if (this.direction === 'UP') {
        y = (this.height + y - 1) % this.height;
      }
      if (this.direction === 'DOWN') {
        y = (y + 1) % this.height;
      }
      if (this.direction === 'LEFT') {
        x = (this.width + x - 1) % this.width;
      }
      if (this.direction === 'RIGHT') {
        x = (x + 1) % this.width;
      }
      this.body.unshift({ x: x, y: y });

      var apple = apples.find(function (apple) {
        return apple.x === x && apple.y === y;
      });
      if (apple) {
        return apple;
      }
      this.body.pop();
    },

    makeTurn: function makeTurn(turn) {
      if (this.newDirection !== null) return;
      if (turn === 'UP' && this.direction != 'DOWN') this.newDirection = 'UP';
      if (turn === 'DOWN' && this.direction != 'UP') this.newDirection = 'DOWN';
      if (turn === 'LEFT' && this.direction != 'RIGHT') this.newDirection = 'LEFT';
      if (turn === 'RIGHT' && this.direction != 'LEFT') this.newDirection = 'RIGHT';
    }
  };
};

},{}]},{},[3]);
