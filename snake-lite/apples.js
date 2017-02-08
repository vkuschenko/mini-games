function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default () => {
  return {
    apples: [],

    generateApples: function(arenaWidth, arenaHeight, snakeBody) {
      if (this.apples.length === 0) {
        const x = getRandomInt(0, arenaWidth);
        const y = getRandomInt(0, arenaHeight);

        const overlap = snakeBody.find((point) => {
          return point.x === x && point.y === y;
        });

        if (!overlap) {
          this.apples = [ {x, y} ];
        }
      }
    },

    removeApple: function () {
      this.apples = [];
    }
  }
}