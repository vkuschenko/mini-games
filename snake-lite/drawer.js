function drawArena(context, arenaWidth, arenaHeight) {
  context.fillStyle = 'white';
  context.fillRect(0, 0, arenaWidth, arenaHeight);
}

function drawSnake(context, snakeBody) {
  context.fillStyle = 'black';
  snakeBody.forEach((cell) => context.fillRect(cell.x, cell.y, 1, 1));
}

function drawApples(context, apples) {
  context.fillStyle = 'red';
  apples.forEach((apple) => context.fillRect(apple.x, apple.y, 1, 1));
}

export default function draw(context, arenaWidth, arenaHeight, snakeBody, apples) {
  drawArena(context, arenaWidth, arenaHeight);
  drawSnake(context, snakeBody);
  drawApples(context, apples);
}