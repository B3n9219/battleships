import { Gameboard } from "./Gameboard";
import { Robot } from "./Player"

describe("Robot.chooseCord()", () => {
    test("Smart Cord - 1 existing, 4 options", () => {
        const gameboard = new Gameboard()
        gameboard.placeShip([{x: 0, y: 0}, {x: 1, y: 0}])
        gameboard.recieveAttack({x: 0, y: 0})
        const robot = new Robot()
        expect(robot.chooseCord(gameboard)).toBe({x: 1, y: 0})
    })
})