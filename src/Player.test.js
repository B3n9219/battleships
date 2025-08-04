import { Gameboard } from "./Gameboard";
import { Robot } from "./Player"

describe("Robot.chooseCord()", () => {
    test("Smart Cord - 1 existing, 4 options", () => {
        const gameboard = new Gameboard()
        gameboard.placeShip([{x: 0, y: 0}, {x: 1, y: 0}])
        gameboard.recieveAttack({x: 0, y: 0})
        const robot = new Robot()
        expect(robot.chooseCord(gameboard)).toEqual({x: 1, y: 0})
    })
    test("Smart Cord - 2 existing, 2 options", () => {
        const gameboard = new Gameboard()
        gameboard.placeShip([{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}])
        gameboard.recieveAttack({x: 0, y: 0})
        gameboard.recieveAttack({x: 1, y: 0})
        const robot = new Robot()
        expect(robot.chooseCord(gameboard)).toEqual({x: 2, y: 0})
    })
    test("Smart Cord - 2 existing, 2 options", () => {
        const gameboard = new Gameboard()
        gameboard.placeShip([{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}])
        gameboard.recieveAttack({x: 1, y: 0})
        gameboard.recieveAttack({x: 2, y: 0})
        gameboard.recieveAttack({x: 3, y: 0})
        const robot = new Robot()
        expect(robot.chooseCord(gameboard)).toEqual({x: 0, y: 0})
    })
})
