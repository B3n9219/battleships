import "./styles.css";

import {GameManager} from "./GameManager";

let gameManager = new GameManager()
gameManager.start()

document.querySelector(".reset").addEventListener("click", () => {
    gameManager = new GameManager()
    gameManager.start()
})