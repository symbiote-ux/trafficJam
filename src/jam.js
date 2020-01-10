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
  console.log(nextMove.id, blankTile.id);
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
