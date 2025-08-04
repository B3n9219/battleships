import { Ship } from "./Ship.js";

export class Gameboard {
    constructor(size = 10) {
        this.size = size
        this.ships = []
        this.missedAttacks = []
    }
    placeShip(cords) {
        if (cords.length < 2) {
            throw new Error("Ship must be at least 2 long")
        }
        if (!(this.cordsValid(cords))) {
            throw new Error("Ship cords are not valid")
        }
        if (!(this.cordsFree(cords))) {
            throw new Error("Trying to place new ship in occupied area")
        }
        const ship = new Ship(cords.length)
        ship.place(cords)
        this.ships.push(ship)
    }
    cordsValid(cords) {
        let axis, cross
        if (cords[0].x !== cords[1].x) {
            axis = "x"
            cross = "y"
        } else {
            axis = "y"
            cross = "x"
        }
        for (let i = 1; i < cords.length; i++) {
            if (Math.abs(cords[i][axis] - cords[i-1][axis]) !== 1) {
                return false
            }
            if (cords[i-1][cross] !== cords[i][cross]) {
                return false
            }
        }
        return true
    }
    cordsFree(cords) {
        for (let cord of cords) {
            if (!(this.cordOnBoard(cord))) {
                return false
            }
            for (let ship of this.ships) {
                for (let shipCord of ship.cords) {
                    if (cord.x === shipCord.x && cord.y === shipCord.y) {
                        return false
                    }
                }
            }
        }
        return true
    }
    cordOnBoard(cord) {
        return cord.x >= 0 && cord.x < this.size && cord.y >= 0 && cord.y < this.size;
    }
    recieveAttack(cord) {
        for (let ship of this.ships) {
            for (let shipCord of ship.cords) {
                if (shipCord.x === cord.x && shipCord.y === cord.y) {
                    ship.hit(cord)
                    return
                }
            }
        }
        if (!this.cordOnBoard(cord)){
            throw new Error("Attack cord is not on the board (too big or small)")
        } else {
            this.missedAttacks.push(cord)
        }
    }
    allShipsSunk() {
        for (let ship of this.ships) {
            if (!ship.isSunk()) {
                return false
            }
        }
        return true
    }
    shipAtCord(cord) {
        for (let ship of this.ships) {
            for (let shipCord of ship.cords)
            if (cord.x === shipCord.x && cord.y === shipCord.y) {
                return ship
            }
        }
        return null
    }
    isCordMiss(cord) {
        for (let missCord of this.missedAttacks) {
            if (cord.x === missCord.x && cord.y === missCord.y) {
                return true
            }
        }
        return false
    }
    isCordNew(cord) {
        if (this.isCordMiss(cord)) {
            return false
        }
        const ship = this.shipAtCord(cord)
        if (ship) {
            if(ship.isCordHit(cord)) {
                return false
            }
        }
        return true
    }
    placeShips() {

    }
}