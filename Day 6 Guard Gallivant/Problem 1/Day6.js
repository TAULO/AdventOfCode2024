import {fileReader} from '../../Helper.js'

const data = await fileReader('TestInput.txt');
let grid = data.split('\n').map(s => s.split(""))

const obstacle = "#"

// if guard(^) = grid[i - 1][j]
// if guard(>) = grid[i][j + 1]
// if guard(|) = grid[i + 1][j]
// if guard(<) = grid[i][j - 1]

function findGuardStaringPos() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "^") {
                return { row: i, col: j }
            }
        }
    }

    return null
}

function countXs() {
    let count = 0
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "X") {
                count++
            }
        }
    }

    return count
}

function moveGuard(row, col, guard) {
    if (!grid[row - 1] || !grid[row + 1] || !grid[row][col + 1] || !grid[row][col - 1]) return

    grid[row][col] = guard

    if (guard === "^" && grid[row - 1][col] === obstacle) {
        grid[row][col] = "X"
        moveGuard(row, ++col, ">")
        return
    }

    if (guard === ">" && grid[row][col + 1] === obstacle) {
        moveGuard(++row, col, "v")
        grid[row][col] = "X"
        return
    }

    if (guard === "v" && grid[row + 1][col] === obstacle) {
        moveGuard(row, --col, "<")
        grid[row][col] = "X"
        return
    }

    if (guard === "<" && grid[row][col - 1] === obstacle) {
        moveGuard(--row, col, "^")
        grid[row][col] = "X"
        return
    }

    if (grid[row][col] === "^") {
        grid[row][col] = "X"
        moveGuard(--row, col, "^")
    }

    if (grid[row][col] === ">") {
        grid[row][col] = "X"
        moveGuard(row, ++col, ">")
    }
    
    if (grid[row][col] === "v") {
        grid[row][col] = "X"
        moveGuard(++row, col, "v")
    }

    if (grid[row][col] === "<") {
        grid[row][col] = "X"
        moveGuard(row, --col, "<")
    }

    grid[row][col] = "X"
}

const { row, col} = findGuardStaringPos()

moveGuard(row, col, "^")

console.log(grid.map(row => row.join("")).join("\n"))

console.log(countXs(grid)) // 4696
