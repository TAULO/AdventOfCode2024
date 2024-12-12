import {fileReader} from '../../Helper.js'

const data = await fileReader('TestInput.txt');
let grid = data.split('\n').map(s => s.split(""))
let gridCopy = grid.map(row => [...row]);

const obstacle = "#"
const obstruction = "O"

const { guardStartingRow, guardStartingCol } = findGuardStaringPos()

// if guard(^) = grid[i - 1][j]
// if guard(>) = grid[i][j + 1]
// if guard(|) = grid[i + 1][j]
// if guard(<) = grid[i][j - 1]

function findGuardStaringPos() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "^") {
                return { guardStartingRow: i, guardStartingCol: j }
            }
        }
    }

    return null
}

function getDotPos() {
    let pos = []
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === ".") {
                pos.push({
                    dotRow: i,
                    dotCol: j,
                });
            }
        }
    }

    return pos
}


let count = 0

let moves = 0
function moveGuard(row, col, guard, dotPos = null) {
    if (!grid[row - 1] || !grid[row + 1] || !grid[row][col + 1] || !grid[row][col - 1]) return

    moves++

    if (gridCopy[row][col] === obstruction && (grid[row - 1][col] === "+" || grid[row][col + 1] === "+" || grid[row + 1][col] === "+" || grid[row][col - 1] === "+")) {
        console.log("LOOP")
        count++
        return
    }

    grid[row][col] = guard

    // TURN
    if (guard === "^" && grid[row - 1][col] === obstacle) {
        grid[row][col] = "+"
        moveGuard(row, ++col, ">")
        return
    }

    if (guard === ">" && grid[row][col + 1] === obstacle) {
        grid[row][col] = "+"
        moveGuard(++row, col, "v")
        return
    }

    if (guard === "v" && grid[row + 1][col] === obstacle) {
        grid[row][col] = "+"
        moveGuard(row, --col, "<")
        return
    }

    if (guard === "<" && grid[row][col - 1] === obstacle) {
        grid[row][col] = "+"
        moveGuard(--row, col, "^")
        return
    }

    // MOVE
    if (grid[row][col] === "^") {
        grid[row][col] = "|"
        moveGuard(--row, col, "^")
    }

    if (grid[row][col] === ">") {
        grid[row][col] = "-"
        moveGuard(row, ++col, ">")
    }

    if (grid[row][col] === "v") {
        grid[row][col] = "|"
        moveGuard(++row, col, "v")
    }

    if (grid[row][col] === "<") {
        grid[row][col] = "-"
        moveGuard(row, --col, "<")
    }
}

for (let i = 0; i < getDotPos().length; i++) {
    // console.log("\n")
    const { dotRow, dotCol } = getDotPos()[i]
    gridCopy[dotRow][dotCol] = obstruction

    moveGuard(guardStartingRow, guardStartingCol, "^", getDotPos()[i])

    console.log("GRID COPY\n")
    console.log(gridCopy.map(row => row.join("")).join("\n"))
    console.log("\n")
    console.log("GRID\n")
    console.log(grid.map(row => row.join("")).join("\n"))

    gridCopy = data.split('\n').map(s => s.split(""))
    grid = data.split('\n').map(s => s.split(""))
}

console.log(count)

