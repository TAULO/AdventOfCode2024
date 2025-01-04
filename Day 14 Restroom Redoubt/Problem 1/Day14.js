import {
    fileReader
} from '../../Helper.js'

const data = await fileReader('TestInput.txt');

const wide = 11
const tall = 7

function createGrid() {
    const grid = []

    for (let i = 0; i < tall; i++) {
        let inner = []
        for (let j = 0; j < wide; j++) {
            inner.push(".")
        }
        grid.push(inner)
    }

    return grid
}

function getCurrentPos(grid) {
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i]
        for (let j = 0; j < row.length; j++) {
            if (row[j] === "1") return { row: i, col: j }
        }
    }

    return null
}

function setPositions(grid, data, posY, posX, volY, volX) {
    const nextYPos = posY + volY
    const nextXPos = posX + volX

    console.log(nextYPos, nextXPos)

    if (nextYPos >= 0) {
        if (grid[nextYPos][nextXPos]) {
            drawPos(grid, data, nextYPos, nextXPos)
            // grid[nextYPos][nextXPos] = "1"
        } else {
            drawPos(grid, data, nextYPos, nextXPos - wide)
            // grid[nextYPos][nextXPos - wide] = "1"
        }
    } else {
        if (grid[tall + nextYPos][nextXPos]) {
            drawPos(grid, data, tall + nextYPos, nextXPos)
            // grid[tall + nextYPos][nextXPos] = "1"

        } else {
            drawPos(grid, data, tall + nextYPos, nextXPos - wide)
            // grid[tall + nextYPos][nextXPos - wide] = "1"
        }
    }

    grid[posY][posX] = "." // reset
}

function drawPos(grid, data, posY, posX) {
    grid[posY][posX] = "1"
    data.positions.posY = posY
    data.positions.posX = posX

    // if (grid[posY][posX] !== ".")  {
    //     let n = parseInt(grid[posY][posX])
    //     grid[posY][posX] = (n += 1) + ""
    // } else  {
    //     grid[posY][posX] = "1"
    // }
}

const grid = createGrid();

let arr = data.split("\n")

function setInitState() {
    for (let i = 0; i < arr.length; i++) {
        const [positions, velocities] = arr[i].split(" ")

        const [posX, posY] = positions.slice(2).split(",").map(Number)
        const [volX, volY] = velocities.slice(2).split(",").map(Number)

        if (grid[posY][posX] !== ".")  {
            let n = parseInt(grid[posY][posX])
            grid[posY][posX] = ++n + ""
        } else {
            grid[posY][posX] = "1"
        }
    }
}

setInitState()
console.log(grid.map(s => s.join("")))

let dataObj = data.split("\n").map((line) => {
    const [positions, velocities] = line.split(" ")
    const [posX, posY] = positions.slice(2).split(",").map(Number)
    const [volX, volY] = velocities.slice(2).split(",").map(Number)

    return {
        positions: {
            posX,
            posY
        },
        velocities: {
            volX,
            volY,
        }
    }
})

const numOfSeconds = 100
for (let i = 0; i < numOfSeconds; i++) {
    for (let j = 0; j < dataObj.length; j++) {
        const data = dataObj[j]

        setPositions(grid, data, data.positions.posY, data.positions.posX, data.velocities.volY, data.velocities.volX)

    }
    console.log(i + 1, grid.map(s => s.join("")))
}

console.log(dataObj)
// console.log(grid.map(s => s.join("")))


