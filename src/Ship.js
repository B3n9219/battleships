export class Ship {
    constructor(length) {
        this.length = length
        this.cords = null
        this.hitCords = []
    }
    hit(cord) {
        for (let hitCord of this.hitCords) {
            if (cord.x === hitCord.x && cord.y === hitCord.y) {
                throw new Error("Ship has already been hit at this cord")
            }
        }
        this.hitCords.push(cord)
    }
    isSunk() {
        return this.hitCount >= this.length;
    }
    place(cords) {
        this.cords = cords
    }
    get hitCount() {
        return this.hitCords.length
    }
}