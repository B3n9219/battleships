import { Ship } from "./Ship.js"
test("Ship place", () => {
    const ship = new Ship(2)
    ship.place([{x:0, y:0}, {x:1, y:0}])
    expect(ship.cords).toEqual([{x:0, y:0}, {x:1, y:0}])
})

test("Hit count reflects number of hits", () => {
    const ship = new Ship(3)
    ship.hit({x: 0, y: 0})
    ship.hit({x: 1, y: 0})
    expect(ship.hitCount).toBe(2)

})

describe("Ship.hit()", () => {
    test("Ship hit", () => {
        const ship = new Ship(5)
        ship.hit({x: 0, y: 0})
        expect(ship.hitCords).toEqual([{x: 0, y: 0}])
    })
    test("Repeat hits", () => {
        const ship = new Ship(5)
        ship.hit({x: 0, y: 0})
        ship.hit({x: 1, y: 0})
        ship.hit({x: 2, y: 0})
        expect(ship.hitCords).toEqual([{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}])
    })
    test("Repeat hits on same cord", () => {
        const ship = new Ship(5)
        ship.hit({x: 0, y: 0})
        expect(() => ship.hit({x: 0, y: 0})).toThrow("Ship has already been hit at this cord")
        expect(ship.hitCords).toEqual([{x: 0, y: 0}])
    })
})


describe("Ship.is_sunk()", () => {
    test("hit count === ship length", () => {
        const ship = new Ship(5, 5)
        for (let i = 0; i < 5; i++) {
            ship.hit({x: i, y: 0})
        }
        expect(ship.isSunk()).toBe(true)
    })
    test("hit count < ship length", () => {
        const ship = new Ship(5)
        for (let i = 0; i < 3; i++) {
            ship.hit({x: i, y: 0})
        }
        expect(ship.isSunk()).toBe(false)
    })
})