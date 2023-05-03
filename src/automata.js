class Cell {
    constructor(isLive, option) {
        this.elem = document.createElement('div')
        this.elem.cell = this;
        this.isLive = isLive === undefined ? false : isLive;
        console.assert(option.liveColor !== undefined && option.dieColor !== undefined)
        this.option = option
        this.displayColor()
        this.elem.addEventListener('click', () => {
            this.switchLiveState()
        })
    }

    displayColor() {
        this.elem.style.background = this.isLive ? this.option.liveColor : this.option.dieColor
    }

    switchLiveState() {
        if (this.isLive) {
            this.toDie()
        } else {
            this.toLive()
        }
    }

    toLive() {
        this.isLive = true
        this.displayColor()
    }

    toDie() {
        this.isLive = false
        this.displayColor()
    }

}

// Conway's Game of Life
class CGL {
    constructor(container, x, y, option) {
        this.cells = new Array(y) // y rows
        for (let i = 0; i < y; ++i) {
            this.cells[i] = new Array(x);
        }
        container.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${y}, 1fr)`;
        for (let r = 0; r < y; ++r) {
            for (let c = 0; c < x; ++c) {
                this.cells[r][c] = new Cell(Math.random() < 0.1, option)
                this.cells[r][c].elem.style.gridRow = String(r + 1);
                this.cells[r][c].elem.style.gridColumn = String(c + 1);
                container.appendChild(this.cells[r][c].elem)
            }
        }
        this.x = x;
        this.y = y;
        this.container = container
        this.option = option
    }

    cellIsLive(x, y) {
        return this.cells[y][x].isLive
    }

    cellGetLiveAround(x, y) {
        let count = 0;
        const left = {
            x: x === 0 ? this.x - 1 : x - 1,
            y
        }
        const top = {
            x,
            y: y === 0 ? this.y - 1 : y - 1
        }
        const right = {
            x: x === this.x - 1 ? 0 : x + 1,
            y
        }
        const bottom = {
            x,
            y: y === this.y - 1 ? 0 : y + 1
        }
        const leftTop = {
            x: left.x,
            y: top.y
        }
        const leftBottom = {
            x: left.x,
            y: bottom.y
        }
        const rightTop = {
            x: right.x,
            y: top.y
        }
        const rightBottom = {
            x: right.x,
            y: bottom.y
        }
        const allAroundPoints = [leftTop, top, rightTop, right, rightBottom, bottom, leftBottom, left]
        for (const point of allAroundPoints) {
            if (this.cellIsLive(point.x, point.y)) {
                count++
            }
        }
        return count
    }

    cellNextIfLive(x, y) {
        const liveAround = this.cellGetLiveAround(x, y);
        if (this.cellIsLive(x, y)) {
            return liveAround === 2 || liveAround === 3
        } else {
            return liveAround === 3;
        }
    }

    nextStep() {
        const nextStateMatrix = new Array(this.y);
        for (let i = 0; i < this.y; ++i) {
            nextStateMatrix[i] = new Array(this.x)
        }
        for (let r = 0; r < this.y; ++r) {
            for (let c = 0; c < this.x; ++c) {
                nextStateMatrix[r][c] = this.cellNextIfLive(c, r) ? !this.cellIsLive(c, r) : this.cellIsLive(c, r);
            }
        }
        for (let r = 0; r < this.y; ++r) {
            for (let c = 0; c < this.x; ++c) {
                if (nextStateMatrix[r][c]) {
                    this.cells[r][c].switchLiveState()
                }
            }
        }
    }

    addRow() {
        this.y++;
        this.container.style.gridTemplateRows = `repeat(${this.y}, 1fr)`
        this.cells.push(new Array(this.x))
        for (let i = 0; i < this.x; ++i) {
            const newCell = new Cell(false, this.option)
            newCell.elem.style.gridRow = String(this.y)
            newCell.elem.style.gridColumn = String(i + 1)
            this.container.appendChild(newCell.elem)
            this.cells[this.y - 1][i] = newCell
        }
    }

    minusRow() {
        this.y--;
        this.container.style.gridTemplateRows = `repeat(${this.y}, 1fr)`
        const lastRowCells = this.cells[this.y];
        lastRowCells.forEach(c => {
            this.container.removeChild(c.elem)
        })
        this.cells.pop()
    }

    addColumn() {
        this.x++;
        this.container.style.gridTemplateColumns = `repeat(${this.x}, 1fr)`
        this.cells.forEach((ac, i) => {
            const newCell = new Cell(false, this.option)
            newCell.elem.style.gridRow = String(i + 1)
            newCell.elem.style.gridColumn = String(this.x)
            this.container.appendChild(newCell.elem)
            ac.push(newCell)
        })
    }

    minusColumn() {
        this.x--;
        this.container.style.gridTemplateColumns = `repeat(${this.x}, 1fr)`
        this.cells.forEach(ac => {
            const c = ac.pop()
            this.container.removeChild(c.elem)
        })
    }

    setLiveColor(c) {
        this.option.liveColor = c
        this.cells.forEach(ac => {
            ac.forEach(c => {
                c.displayColor()
            })
        })
    }

    setDieColor(c) {
        this.option.dieColor = c
        this.cells.forEach(ac => {
            ac.forEach(c => {
                c.displayColor()
            })
        })
    }
}