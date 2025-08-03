export class Ship {
    constructor(length, hitCount = 0) {
        this.length = length
        this.hitCount = hitCount
    }
    hit() {
        this.hitCount++
    }
    isSunk() {
        return this.hitCount >= this.length;
    }
}