export default (arenaWidth, arenaHeight) => {
  return {
    width: arenaWidth,
    height: arenaHeight,
    body: [{x: 0, y: 0}],
    direction: 'DOWN',
    newDirection: null,

    move: function (apples) {
      if (this.newDirection) {
        this.direction = this.newDirection;
        this.newDirection = null;
      }

      let {x, y} = this.body[0];

      if (this.direction === 'UP') {
        y = (this.height + y - 1) % this.height;
      }
      if (this.direction === 'DOWN') {
        y = (y + 1) % this.height;
      }
      if (this.direction === 'LEFT') {
        x = (this.width + x - 1) % this.width
      }
      if (this.direction === 'RIGHT') {
        x = (x + 1) % this.width
      }
      this.body.unshift({x, y});

      const apple = apples.find((apple) => apple.x === x && apple.y === y);
      if (apple) {
        return apple;
      }
      this.body.pop();
    },

    makeTurn: function(turn){
      if (this.newDirection !== null) return;
      if (turn === 'UP' && this.direction != 'DOWN') this.newDirection = 'UP';
      if (turn === 'DOWN' && this.direction != 'UP') this.newDirection = 'DOWN';
      if (turn === 'LEFT' && this.direction != 'RIGHT') this.newDirection = 'LEFT';
      if (turn === 'RIGHT' && this.direction != 'LEFT') this.newDirection = 'RIGHT';
    }
  }
}