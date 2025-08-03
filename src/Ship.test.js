import { Ship } from "./Ship.js"

test("Ship hit", () => {
    const ship = new Ship(5)
    ship.hit()
    expect(ship.hitCount).toBe(1)
})

describe("Ship.is_sunk()", () => {
    test("hit count > ship length", () => {
        const ship = new Ship(5, 7)
        expect(ship.isSunk()).toBe(true)
    })
    test("hit count === ship length", () => {
        const ship = new Ship(5, 5)
        expect(ship.isSunk()).toBe(true)
    })
    test("hit count < ship length", () => {
        const ship = new Ship(5, 3)
        expect(ship.isSunk()).toBe(false)
    })
})