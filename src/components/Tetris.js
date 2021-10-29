import React, { useState } from "react"

import { createStage, checkCollision } from "../gameHelpers"

import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris"

import { useInterval } from "../hooks/useInterval"
import { usePlayer } from "../hooks/usePlayer"
import { useStage } from "../hooks/useStage"
import { useGameStatus } from "../hooks/useGameStatus"

import Stage from "./Stage"
import Display from "./Display"
import StartButton from "./StartButton"

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null)
    const [gameOver, setGameOver] = useState(false)

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer)
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared)

    console.log("re-render")

    const movePlayer = dir => {
        if (!checkCollision(player, stage, {x: dir, y:0 })) {
            updatePlayerPos({ x: dir, y: 0})
        }
    }

    const startGame = () => {
        console.log("test")
        setStage(createStage())
        setDropTime(1000)
        resetPlayer()
        setGameOver(false)
        setScore(0)
        setRows(0)
        setLevel(0)
    }
    
    const drop = () => {
        // øk nivå når spilleren har klart 10 rader
        if(rows > (level + 1) * 10) {
            setLevel(prev => prev + 1)
            setDropTime(1000 / (level + 1) + 200)
        }

        if (!checkCollision(player, stage, {x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false})
        } else {
            //game over
            if (player.pos.y < 1) {
                console.log("game over")
                setGameOver(true)
                setDropTime(null)
            }
            updatePlayerPos({ x:0, y: 0, collided: true})
        }
    }
    
    const keyUp = ({keyCode}) => {
        if (!gameOver) {
            if(keyCode === 40 || 32) {
                console.log("interval on")
                setDropTime(1000 / (level + 1) + 200)
            }
        }
    }
    
    const dropPlayer = () => {
        console.log("interval off")
        setDropTime(null)
        drop()
    }

    const instantDrop = () => {
        console.log("interval off")
        setDropTime(null)
        if(rows > (level + 1) * 10) {
            setLevel(prev => prev + 1)
            setDropTime(1000 / (level + 1) + 200)
        }
        let sjekk = 0//loop for å sjekke hver linje til den møter en som har collision
        while(!checkCollision(player, stage, {x:0, y: sjekk})) {
            console.log("while-loop" + sjekk)
            sjekk++
        }
        /*----------------remember where we came from--------------------
        if (checkCollision(player, stage, {x: 0, y: 1 })) {
            sjekk = 0
        }else if (checkCollision(player, stage, {x: 0, y: 2 })){
            sjekk = 1
        }else if (checkCollision(player, stage, {x: 0, y: 3 })){
            sjekk = 2
        }else if (checkCollision(player, stage, {x: 0, y: 4 })){
            sjekk = 3
        }else if (checkCollision(player, stage, {x: 0, y: 5 })){
            sjekk = 4
        }else if (checkCollision(player, stage, {x: 0, y: 6 })){
            sjekk = 5
        }else if (checkCollision(player, stage, {x: 0, y: 7 })){
            sjekk = 6
        }else if (checkCollision(player, stage, {x: 0, y: 8 })){
            sjekk = 7
        }else if (checkCollision(player, stage, {x: 0, y: 9 })){
            sjekk = 8
        }else if (checkCollision(player, stage, {x: 0, y: 10 })){
            sjekk = 9
        }else if (checkCollision(player, stage, {x: 0, y: 11 })){
            sjekk = 10
        }else if (checkCollision(player, stage, {x: 0, y: 12 })){
            sjekk = 11
        }else if (checkCollision(player, stage, {x: 0, y: 13 })){
            sjekk = 12
        }else if (checkCollision(player, stage, {x: 0, y: 14 })){
            sjekk = 13
        }else if (checkCollision(player, stage, {x: 0, y: 15 })){
            sjekk = 14
        }else if (checkCollision(player, stage, {x: 0, y: 16 })){
            sjekk = 15
        }else if (checkCollision(player, stage, {x: 0, y: 17 })){
            sjekk = 16
        }else if (checkCollision(player, stage, {x: 0, y: 18 })){
            sjekk = 17
        }else if (checkCollision(player, stage, {x: 0, y: 19 })){
            sjekk = 18
        }else if (checkCollision(player, stage, {x: 0, y: 20 })){
            sjekk = 19
        }----------------------------------------------------------*/

        console.log(sjekk)
        updatePlayerPos({x:0, y:sjekk-1, collided:true}) //flytt tetromino til stedet hvor loopen fant collision
    }    
    
    
    const move = ({keyCode}) => {
        if (!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1)
            } else if (keyCode === 39) {
                movePlayer(1)
            } else if (keyCode === 40) {
                dropPlayer()
            } else if (keyCode === 38) {
                playerRotate(stage, 1)
            } else if (keyCode === 32) {
                //drop helt ned
                instantDrop()
            }
        }
    }

    useInterval(() => {
        drop()
    }, dropTime)

    return (
        <StyledTetrisWrapper 
            role="button" 
            tabIndex="0" 
            onKeyDown={e => move(e)} 
            onKeyUp={keyUp}
        >
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over" />
                    ) : (
                        <div>
                            <Display text={`Score: ${score}`} />
                            <Display text={`Rows: ${rows}`} />
                            <Display text={`Level: ${level}`} />
                        </div>
                    )}
                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris