import { Gameboard } from "./Gameboard";
import {Ship} from "./Ship";

describe("Gameboard.placeShip()", () => {
    describe("Valid placements", () => {
        test("horizontal ship", () => {
            const gameboard = new Gameboard()
            gameboard.placeShip([{x: 0, y: 0}, {x: 1, y: 0}])
            expect(gameboard.ships.length).toBe(1)
        })
        test("vertical ship", () => {
            const gameboard = new Gameboard()
            gameboard.placeShip([{x: 0, y: 0}, {x: 0, y: 1}])
            expect(gameboard.ships.length).toBe(1)
        })
        test("long ship", () => {
            const gameboard = new Gameboard()
            gameboard.placeShip([{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}])
            expect(gameboard.ships.length).toBe(1)
        })
        test("ship on board edge", () => {
            const gameboard = new Gameboard()
            gameboard.placeShip([{x: 9, y: 9}, {x:9, y: 8}])
            expect(gameboard.ships.length).toBe(1)
        })
        test("cords backwards", () => {
            const gameboard = new Gameboard()
            gameboard.placeShip([{x: 1, y: 0}, {x:0, y: 0}])
            expect(gameboard.ships.length).toBe(1)
        })
        test("consecutive ships", () => {
            const gameboard = new Gameboard()
            gameboard.placeShip([{x: 0, y: 0}, {x:1, y: 0}])
            gameboard.placeShip([{x: 2, y: 0}, {x:3, y: 0}])
            expect(gameboard.ships.length).toBe(2)
        })
    })

    describe("Invalid placements", () => {
        test("ship cords < 2", () => {
            const gameboard = new Gameboard()
            expect(() => gameboard.placeShip([{x: 0, y: 0}])).toThrow("Ship must be at least 2 long")
        })
        test("invalid ship placement (broken cords)", () => {
            const gameboard = new Gameboard()
            expect(() => gameboard.placeShip([{x: 0, y: 0}, {x: 2, y: 0}])).toThrow("Ship cords are not valid")

        })
        test("invalid ship placement (diagonal cords)", () => {
            const gameboard = new Gameboard()
            expect(() => gameboard.placeShip([{x: 0, y: 0}, {x: 1, y: 1}])).toThrow("Ship cords are not valid")
        })
        test("invalid ship placement (out of bounds)", () => {
            const gameboard = new Gameboard()
            expect(() => gameboard.placeShip([{x: 10, y: 10}, {x: 9, y: 10}])).toThrow("Trying to place new ship in occupied area")
        })
        test("Ship overlaps with other ship", () => {
            const gameboard = new Gameboard()
            gameboard.placeShip([{x: 0, y: 0}, {x: 1, y: 0}])
            expect(() => gameboard.placeShip([{x: 1, y: 0}, {x: 2, y: 0}])).toThrow("Trying to place new ship in occupied area")
        })
    })
})


describe("Gameboard.recieveAttack", () => {
     test("Miss on empty board", () => {
         const gameboard = new Gameboard()
         gameboard.recieveAttack({x: 5, y: 5})
         expect(gameboard.missedAttacks).toEqual([{x: 5, y: 5}])
     })
    test("Miss (with ship on board)", () => {
        const gameboard = new Gameboard()
        gameboard.placeShip([{x: 0, y: 0}, {x: 1, y: 0}])
        gameboard.recieveAttack({x: 5, y: 5})
        expect(gameboard.missedAttacks).toEqual([{x: 5, y: 5}])
    })
    test("Miss (on border)", () => {
        const gameboard = new Gameboard()
        gameboard.recieveAttack({x: 9, y: 9})
        expect(gameboard.missedAttacks).toEqual([{x: 9, y: 9}])
    })
    test("Ship hit", () => {
        const gameboard = new Gameboard()
        gameboard.placeShip([{x: 5, y: 5}, {x: 6, y: 5}])
        gameboard.recieveAttack({x: 5, y: 5})
        expect(gameboard.missedAttacks).toEqual([])
    })
    test("Attack out of bounds", () => {
        const gameboard = new Gameboard()
        expect(() => gameboard.recieveAttack({x: 10, y: 10})).toThrow("Attack cord is not on the board (too big or small)")
    })
})

describe("Gameboard.allShipsSunk", () => {
    test("No ships sunk", () => {
        const gameboard = new Gameboard()
        gameboard.placeShip([{x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}])
        gameboard.placeShip([{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}])
        expect(gameboard.allShipsSunk()).toBe(false)
    })
    test("1 / 2 ships sunk", () => {
        const gameboard = new Gameboard()
        gameboard.placeShip([{x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}])
        gameboard.placeShip([{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}])
        for (let i = 1; i < 4; i++) {
            gameboard.recieveAttack({x: i, y: 0})
        }
        expect(gameboard.allShipsSunk()).toBe(false)
    })
    test("all ships sunk", () => {
        const gameboard = new Gameboard()
        gameboard.placeShip([{x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}])
        gameboard.placeShip([{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}])
        for (let i = 1; i < 4; i++) {
            gameboard.recieveAttack({x: i, y: 0})
            gameboard.recieveAttack({x: i, y: 1})

        }
        expect(gameboard.allShipsSunk()).toBe(true)
    })
})
describe("Gameboard.shipAtCord()", () => {
    test("Not at cord", () => {
        const gameboard = new Gameboard()
        gameboard.placeShip([{x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}])
        expect(gameboard.shipAtCord({x:5, y: 5})).toBe(null)
    })
    test("At cord", () => {
        const gameboard = new Gameboard()
        gameboard.placeShip([{x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}])
        expect(gameboard.shipAtCord({x:1, y: 0})).toBeTruthy()
    })
})

describe("Gameboard.isCordMiss()", () => {
    test("Cord not miss", () => {
        const gameboard = new Gameboard()
        expect(gameboard.isCordMiss({x: 0, y: 0})).toBe(false)
    })
    test("Cord not miss", () => {
        const gameboard = new Gameboard()
        gameboard.recieveAttack({x: 5, y: 5})
        expect(gameboard.isCordMiss({x: 0, y: 0})).toBe(false)
    })
    test("Cord is miss", () => {
        const gameboard = new Gameboard()
        gameboard.recieveAttack({x: 0, y: 0})
        expect(gameboard.isCordMiss({x: 0, y: 0})).toBe(true)
    })
})
