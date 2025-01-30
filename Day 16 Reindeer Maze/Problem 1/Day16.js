import {fileReader} from '../../Helper.js'

const data = await fileReader('TestInput.txt');

const map = data.split('\n').map(line => line.split(""))

function printMap() {
    return map.map(line => line.join("")).join('\n')
}

function findStartPos() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === "S") return {
                row: i,
                col: j,
            }
        }
    }

    return -1
}

const {row , col } = findStartPos()

let index = 1

while (map[row][col + index] === ".") {
    map[row][col + index] = "S"

    index++
    // map[row][col + prev] = "."
}

console.log(printMap())


