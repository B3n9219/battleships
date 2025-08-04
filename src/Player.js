import {Gameboard} from "./Gameboard";


export class Player {
    constructor(gameboard) {
        this.gameboard = gameboard
    }
}

export class Robot extends Player {
    constructor(gameboard) {
        super(gameboard)
    }
    chooseCord() {
        let valid = false
        let cord
        while (!valid) {
            cord = {
                x: Math.floor(Math.random() * this.gameboard.size),
                y: Math.floor(Math.random() * this.gameboard.size)
            }
            if (this.gameboard.isCordNew(cord)) {
                valid = true
            }
        }
        return cord
    }

}