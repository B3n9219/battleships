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
    populateGameboard(gameboard) {
        gameboard.placeShip([{x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}])
        gameboard.placeShip([{x: 8, y: 1}, {x: 8, y: 2}, {x: 8, y: 3}, {x: 8, y: 4}])
        gameboard.placeShip([{x: 9, y: 9}, {x: 8, y: 9}])
        gameboard.placeShip([{x: 5, y: 3}, {x: 5, y: 4}, {x: 5, y: 5}, {x: 5, y: 6}, {x: 5, y: 7}])
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