import {fileReader} from '../../Helper.js'

const data = await fileReader('TestInput.txt');

const [map, moves] = data.split("\n\n")

const mapGrid = map.split("\n").map(s => s.split(""))

function findRobotPos() {
    for (let i = 0; i < mapGrid.length; i++) {
        const cols = mapGrid[i]

        for (let j = 0; j < cols.length; j++) {
            if (cols[j] === "@") return {
                row: i,
                col: j,
            }
        }
    }

    return -1
}

function moveLeft() {
    const {row, col} = findRobotPos()

    const left = mapGrid[row][col - 1]

    if (left === "#") return

    if (left === ".") {
        mapGrid[row][col - 1] = "@"
    }

    if (left === "O") {
        let index = 0
        let toMoveCount = 0

        while (mapGrid[row][col - index] !== "#") {
            if (mapGrid[row][col - index] === ".") {
                for (let i = 0; i < toMoveCount; i++) {
                    mapGrid[row][col - index + i] = mapGrid[row][col - index + (i + 1)]
                    mapGrid[row][col - index + (i + 1)] = "."
                }
                break
            } else {
                toMoveCount++
            }

            index++
        }

        console.log(mapGrid.map(s => s.join("")))
        return
    }

    mapGrid[row][col] = "." // reset

    console.log(mapGrid.map(s => s.join("")))
}

function moveRight() {
    const {row, col} = findRobotPos()

    const right = mapGrid[row][col + 1]

    if (right === "#") return

    if (right === ".") {
        mapGrid[row][col + 1] = "@"
    }

    if (right === "O") {
        let index = 0
        let toMoveCount = 0

        while (mapGrid[row][col + index] !== "#") {
            if (mapGrid[row][col + index] === ".") {
                for (let i = 0; i < toMoveCount; i++) {
                    mapGrid[row][col + index + i] = mapGrid[row][col + index + (i + 1)]
                    mapGrid[row][col + index + (i + 1)] = "."
                }
                break
            } else {
                toMoveCount++
            }

            index++
        }

        console.log(mapGrid.map(s => s.join("")))
        return
    }

    mapGrid[row][col] = "." // reset

    console.log(mapGrid.map(s => s.join("")))
}

function moveUp() {
    const {row, col} = findRobotPos()

    const up = mapGrid[row - 1][col]

    if (up === "#") return

    if (up === ".") {
        mapGrid[row - 1][col] = "@"
    }

    mapGrid[row][col] = "." // reset

    console.log(mapGrid.map(s => s.join("")))
}

function moveDown() {
    const {row, col} = findRobotPos()

    const down = mapGrid[row + 1][col]

    if (down === "#") return

    if (down === ".") {
        mapGrid[row + 1][col] = "@"
    }

    mapGrid[row][col] = "." // reset

    console.log(mapGrid.map(s => s.join("")))
}

console.log(mapGrid.map(s => s.join("")))
moveRight()
console.log(mapGrid.map(s => s.join("")))

