import { DisplayManager } from "./DisplayManager.js";
import { Gameboard } from "./Gameboard.js";
import { Player, Robot } from "./Player.js";


export class GameManager {
    constructor() {
        this.gameContainer = document.querySelector(".game")
        this.player = new Player(new Gameboard())
        this.robot = new Robot(new Gameboard())
        this.playRound = this.playRound.bind(this)
        this.displayManager = new DisplayManager(this.gameContainer, this.player.gameboard, this.robot.gameboard, this.playRound)
    }
    start() {
        // this.populateGameboard(this.player.gameboard)
        // this.populateGameboard(this.robot.gameboard)
        this.player.gameboard.placeShips()
        this.robot.gameboard.placeShips()
        this.displayManager.updateDisplay()
    }
    playRound(cord) {
        console.log(cord)
        if (!this.robot.gameboard.isCordNew(cord)) {
            return
        }
        this.robot.gameboard.recieveAttack(cord)
        this.player.gameboard.recieveAttack(this.robot.chooseCord(this.player.gameboard))
        this.displayManager.updateDisplay()
        if (this.robot.gameboard.allShipsSunk()) {
            alert("Player WINS")
        } else if(this.player.gameboard.allShipsSunk()) {
            alert("Robot Wins")
        }
    }
}