export const STAGE_WIDTH = 12
export const STAGE_HEIGHT = 20

export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () => 
    new Array(STAGE_WIDTH).fill([0, "clear"])
    )

export const checkCollision = (player, stage, {x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y++) {
        for (let x = 0; x < player.tetromino[y].length; x++) {
            //sjekk om vi er på en tetromino celle
            if (player.tetromino[y][x] !== 0) {
                if(
                    //sjekk at bevegelsen er inni spillets område (høyden Y)
                    !stage[y + player.pos.y + moveY] || 
                    //sjekk at bevegelsen er inni spillets område (bredde X)
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                    //sjekk at cellen vi beveger til ikke er satt til "clear"
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
                    "clear"
                ) {
                    return true
                }
            }
        }
    }
}