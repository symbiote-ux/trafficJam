const noOfLines = prompt('which level you want');

const getWinningCom = () => {
  const leftWinningComb = new Array((noOfLines - 1) / 2);
  leftWinningComb.fill('R');
  const rightWinningComb = new Array((noOfLines - 1) / 2);
  rightWinningComb.fill('L');
  const middleWin = ['S'];
  const winningCondition = leftWinningComb
    .concat(middleWin)
    .concat(rightWinningComb);
  return winningCondition;
};

const isWon = () => {
  const winCon = getWinningCom();
  const game = Array.from(document.querySelectorAll('.R,.S,.L'));
  const gameClass = game.map(e => e.className);
  return gameClass.every((wall, index) => wall == winCon[index]);
};

const displayMsg = () => {
  if (isWon()) {
    const msg = document.getElementById('msgBox');
    msg.style.display = 'block';
  }
};

const showInvalidMove = function(nextMove) {
  nextMove.style.animation = 'wrongMove 2s';
};

const swapTiles = (blankTile, nextMove) => {
  const blankTileClass = blankTile.className;
  const nextMoveClass = nextMove.className;
  blankTile.className = nextMoveClass;
  nextMove.className = blankTileClass;
  const blankTileImage = blankTile.getElementsByTagName('img')[0].src;
  const nextMoveImage = nextMove.getElementsByTagName('img')[0].src;
  blankTile.getElementsByTagName('img')[0].src = nextMoveImage;
  nextMove.getElementsByTagName('img')[0].src = blankTileImage;
};

const isValidMove = (blankTile, nextMove) => {
  if (nextMove.className == 'L') {
    const min = +blankTile.id - 2;
    return nextMove.id >= min && nextMove.id < +blankTile.id;
  }
  const max = +blankTile.id + 2;
  return nextMove.id <= max && nextMove.id > +blankTile.id;
};

const findBlankTile = () => {
  return document.getElementsByClassName('S')[0];
};

const playerMove = () => {
  const nextMove = event.target.parentNode;
  const blankTile = findBlankTile();
  const isValid = isValidMove(blankTile, nextMove);
  if (isValid) {
    swapTiles(blankTile, nextMove);
    displayMsg();
    return;
  }
  showInvalidMove(nextMove);
};

const createWall = function(height, imageUrl, className, id) {
  const wall = document.createElement('div');
  wall.id = id;
  wall.className = className;
  wall.onclick = playerMove;
  const image = document.createElement('img');
  image.src = imageUrl;
  const tower = document.createElement('div');
  tower.className = 'tower';
  tower.style.height = '' + height + '0px';
  wall.appendChild(image);
  wall.appendChild(tower);
  board.appendChild(wall);
};

const createBoard = function(noOfWalls) {
  let id = 1;
  maxHeight = Math.ceil(noOfWalls / 2);
  for (let i = 1; i < maxHeight; i++) {
    const heightOfWall = i * 5;
    createWall(heightOfWall, '../data/left.jpg', 'L', id++);
  }
  createWall(maxHeight * 5, '../data/spaceE.png', 'S', id++);
  for (let i = maxHeight - 1; i >= 1; i--) {
    const heightOfWall = i * 5;
    createWall(heightOfWall, '../data/cat.png', 'R', id++);
  }
};

const myDetails = () => {
  const msg = document.getElementById('details');
  msg.style.display = 'block';
};

const main = function() {
  createBoard(noOfLines);
};
