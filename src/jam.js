const showInvalidMove = function(nextMove) {
  nextMove.style.animation = 'wrongMove 2s';
};

const swapTiles = function(blankTile, nextMove) {
  const blankTileClass = blankTile.className;
  const nextMoveClass = nextMove.className;
  let holder = blankTileClass;
  blankTile.className = nextMoveClass;
  nextMove.className = holder;
  holder = blankTile.innerText;
  blankTile.innerText = nextMove.innerText;
  nextMove.innerText = holder;
};

const isValidMove = function(blankTile, nextMove) {
  if (nextMove.className === 'tileR') {
    const min = +blankTile.id - 2;
    return nextMove.id >= min && nextMove.id < +blankTile.id;
  }
  const max = +blankTile.id + 2;
  return nextMove.id <= max && nextMove.id > +blankTile.id;
};

const findBlankTile = function() {
  const blankTile = document.getElementsByClassName('tileS')[0];
  return blankTile;
};

const playerMove = function(move) {
  const nextMove = move.target;
  const blankTile = findBlankTile();
  const isValid = isValidMove(blankTile, nextMove);
  if (isValid) {
    return swapTiles(blankTile, nextMove);
  }
  showInvalidMove(nextMove);
};

const addBlocks = function(
  board,
  tileClass,
  tileText,
  [min, max, incValue],
  imgUrl
) {
  for (let index = min; index <= max; index++) {
    const block1 = document.createElement('div');
    const image = document.createElement('img');
    image.src = imgUrl;
    image.style.height = '50px';
    image.style.width = '67px';
    const block = document.createElement('div');
    block.id = '' + index;
    block.className = tileClass;
    block.innerText = tileText;
    this.height = this.height + incValue;
    block.style = `height:${this.height}px;`;
    block1.appendChild(image);
    block1.appendChild(block);
    board.appendChild(block1);
  }
};

const createTiles = function() {
  const board = document.getElementById('path');
  const addBlocksAccToHeight = addBlocks.bind({height: 0});
  addBlocksAccToHeight(board, 'tileR', 'R', [1, 10, 30], '../data/right.jpg');
  addBlocksAccToHeight(board, 'tileS', '', [11, 11, 30], '../data/space.jpg');
  addBlocksAccToHeight(board, 'tileL', 'L', [12, 21, -30], '../data/left.jpg');
};
