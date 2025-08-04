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
    sortHitCords() {
        let axis
        this.hitCords[0].x === this.hitCords[1].x? axis = "y": axis = "x"
        this.hitCords.sort((a, b) => a[axis] - b[axis])
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
    isCordHit(cord) {
        for (let hitCord of this.hitCords) {
            if (cord.x === hitCord.x && cord.y === hitCord.y) {
                return true
            }
        }
        return false
    }
}