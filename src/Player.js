export class Player {
    constructor(gameboard) {
        this.gameboard = gameboard
    }
}

export class Robot extends Player {
    constructor(gameboard) {
        super(gameboard)
    }
    chooseCord(opponentBoard) {
        let cord = this.chooseSmartCord(opponentBoard)
        if (!cord) {
            cord = this.chooseRandomCord(opponentBoard)
        }
        return cord
    }
    chooseSmartCord(gameboard) {
        let cord
        const changes = [{x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}]
        for (let ship of gameboard.ships) {
            if (ship.hitCords.length < ship.length) {
                if (ship.hitCords.length === 1) {
                    const hitCord = ship.hitCords[0]
                    for (let i = 0; i < changes.length; i++) {
                        cord = {x: hitCord.x + changes[i].x, y: hitCord.y + changes[i].y}
                        if (gameboard.isCordNew(cord) && gameboard.cordOnBoard(cord)) {
                            return cord
                        }
                    }
                }
                else if (ship.hitCords.length > 1) {
                    ship.sortHitCords()
                    const lastIndex = ship.hitCords.length - 1
                    const xDiff = ship.hitCords[lastIndex].x - ship.hitCords[lastIndex - 1].x
                    const yDiff = ship.hitCords[lastIndex].y - ship.hitCords[lastIndex - 1].y
                    cord = {x: ship.hitCords[lastIndex].x + xDiff, y: ship.hitCords[lastIndex].y + yDiff}
                    if (gameboard.isCordNew(cord) && gameboard.cordOnBoard(cord)) {
                        return cord
                    }
                    cord = {x: ship.hitCords[0].x - xDiff, y: ship.hitCords[0].y - yDiff}
                    if (gameboard.isCordNew(cord) && gameboard.cordOnBoard(cord)) {
                        return cord
                    }
                }
            }
        }
        return null
    }
    chooseRandomCord(gameboard) {
        let valid = false
        let cord
        while (!valid) {
            cord = {
                x: Math.floor(Math.random() * gameboard.size),
                y: Math.floor(Math.random() * gameboard.size)
            }
            if (gameboard.isCordNew(cord)) {
                valid = true
            }
        }
        console.log("ROBO CORD")
        return cord
    }

}