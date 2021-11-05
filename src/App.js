import React from "react"
import Tetris from "./components/Tetris"

function App() {
    return (
    <div>
        <head>
            <title>React Tetris</title>
            <meta name="description" content="Created by Benjamin" />
            <link rel="icon" href="./img/tetrisikon.png" />
            <meta property="og:image" content="./img/tetrisikon.png" />
        </head>
        <Tetris />
    </div>
    )
}

export default App;