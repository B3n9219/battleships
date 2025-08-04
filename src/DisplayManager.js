export class DisplayManager {
    constructor(container, gameboard1, gameboard2, playRoundCallback) {
        this.container = container
        this.gameboard1 = gameboard1
        this.gameboard2 = gameboard2
        this.playRound = playRoundCallback
        this.renderedGameboards = []
    }
    renderDisplay() {
        this.renderedGameboards.push(this.container.appendChild(this.renderGameboard(this.gameboard1)))
        this.renderedGameboards.push(this.container.appendChild(this.renderGameboard(this.gameboard2)))
        const enemyBoard = this.renderedGameboards[1]
        const cells = enemyBoard.querySelectorAll(".cell")
        for (let cell of cells) {
            cell.addEventListener('click', () => {
                this.playRound({x: Number(cell.dataset.x), y: Number(cell.dataset.y)})
            })
        }
    }
    renderGameboard(gameboard) {
        const boardContainer = document.createElement("div")
        boardContainer.classList.add("gameboard")
        for (let y = gameboard.size - 1; y >= 0; y--) {
            for (let x = 0; x < gameboard.size; x++) {
                const cell = document.createElement("div")
                cell.dataset.x = String(x)
                cell.dataset.y = String(y)
                cell.classList.add("cell")
                const ship = gameboard.shipAtCord({x, y})
                if (ship) {
                    cell.classList.add("ship")
                    for (let hitCord of ship.hitCords) {
                        if (ship.isCordHit({x, y})) {
                            cell.classList.add("hit")
                        }
                    }
                } else {
                    cell.classList.add("empty")
                    if (gameboard.isCordMiss({x, y})) {
                        cell.classList.add("miss")
                    }
                }
                boardContainer.appendChild(cell)
            }
        }
        return boardContainer
    }
    updateDisplay() {
        this.container.innerHTML = ''
        this.renderedGameboards = []
        this.renderDisplay()
    }
}