import React, { useState, useEffect } from "react";
import createBoard from "../util/createBoard";
import Cell from "./Cell";
import { revealed } from "../util/reveal";
import Modal from "./Modal";
import Timer from "./Timer";

const Board = () => {
    const [grid,setGrid] = useState([]);
    const [nonMineCount, setNonMineCount] = useState(0);
    const [mineLocations, setMineLocations] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [newTime, setTime] = useState(0);

    useEffect(()=>{
        
        freshBoard();
    },[]);

    const freshBoard=()=>{
        const newBoard= createBoard(10,10,15);
        setNonMineCount(10*10-15);
        setMineLocations(newBoard.mineLocation);
        setGrid(newBoard.board);
    }


    const restartGame= () =>{
        freshBoard();
        setGameOver(false);
    }
    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
    // to not have a dropdown on left click
    e.preventDefault();
    // Deep copy of a state 
    let newGrid = JSON.parse(JSON.stringify(grid));
    console.log(newGrid[x][y]);
    newGrid[x][y].flagged = true;
    setGrid(newGrid);
    };

    //reveal cell
    const revealCell= (x,y) =>{
        if (grid[x][y].revealed || gameOver){
            return;
        }
        let newGrid = JSON.parse(JSON.stringify(grid));
        if ( newGrid[x][y].value === 'X'){
            
            for (let i = 0; i < mineLocations.length; i++) {
                newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
              }
              setGrid(newGrid);
              setGameOver(true);
        }
        else{
            let newRevealBoard = revealed(newGrid ,x ,y, nonMineCount);
            setGrid(newRevealBoard.arr);
            setNonMineCount(newRevealBoard.newNonMinesCount);
            if (newRevealBoard.newNonMinesCount===0){
                setGameOver(true);
            }
        }
       
    }
  
    return (
        <div>
            <p>
               Minesweeper
            </p>
            <Timer />
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", position: "relative"}}
            >   {gameOver && <Modal restartGame={restartGame}/>} {
                 grid.map((singleRow)=>{
                    return (
                        <div style={{display : "flex" }}>
                         {singleRow.map(singleBlock=>{
                            return (
                            <Cell 
                            revealCell={revealCell}
                            details={singleBlock}
                            updateFlag={updateFlag}
                            />
                            );
                        })}
                            </div>
                    
                      );
                     })} </div>
          
            
        </div>
    )
 
        
       

};


export default Board;
