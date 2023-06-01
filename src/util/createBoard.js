export default (row, col, bombs) => {
    let board = [];
    let mineLocation = [];
    // Create blank board
  
    // x = column
    for (let x = 0; x < row; x++) {
      let subCol = [];
      for (let y = 0; y < col; y++) {
        subCol.push({
          value: 0,
          revealed: false,
          x: x,
          y: y,
          flagged: false,
        });
      }
      board.push(subCol);
    }
  
    // Randomize Bomb Placement
    let bombsCount = 0;
    while (bombsCount < bombs) {
      let x = randomNum(0, row - 1);
      let y = randomNum(0, col - 1);
  
      if (board[x][y].value === 0) {
        board[x][y].value = "X";
        mineLocation.push([x, y]);
        bombsCount++;
      }
    }

    // Add Numbers
    for (let roww = 0; roww < row; roww++) {
        for (let coll = 0; coll < col; coll++) {
        if (board[roww][coll].value === "X") {
            continue;
        }
        //top
        if(roww > 0 && board[roww-1][coll].value==="X"){
            board[roww][coll].value++;
        }
        //down
        if (roww< row-1 && board[roww+1][coll].value === "X"){
            board[roww][coll].value++;
        }
        //left
        if(coll >0 && board[roww][coll-1].value ==="X"){
            board[roww][coll].value++;

        }

        //right
        if(coll <col-1 && board[roww][coll+1].value ==="X"){
            board[roww][coll].value++;

        }
        //right up
        if(coll <col-1 && roww > 0 && board[roww-1][coll+1].value ==="X"){
            board[roww][coll].value++;
        }
        //left up
        if(coll >0 && roww > 0 && board[roww-1][coll-1].value ==="X"){
            board[roww][coll].value++;
        }
         //right down
         if(coll <col-1 && roww < row-1 && board[roww+1][coll+1].value ==="X"){
            board[roww][coll].value++;
        }
         //left down
         if(coll >0 && roww <row -1 && board[roww+1][coll-1].value ==="X"){
            board[roww][coll].value++;
        }
     }
    }
    return { board, mineLocation };



};
function randomNum(min = 0, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }