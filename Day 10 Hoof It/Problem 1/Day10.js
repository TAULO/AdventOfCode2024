import {
    fileReader
} from '../../Helper.js'

const data = await fileReader('TestInput.txt');

const arr = data.split('\n').map(s => s.split(""))

function findNextTrailhead() {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j] === "0") return {
                row: i,
                col: j,
            }
        }
    }

    return null
}

let count = 0
let nextIndex = 1

function search(next, row, col) {
    const curr = arr[row][col]

    console.log(curr, nextIndex)

    if (curr === "9") {
        arr[row][col] = "DONE"
    }

    if (arr[row - 1] && parseInt(arr[row - 1][col]) === nextIndex) {
        search(++nextIndex, row - 1, col)
    }

    if (arr[row + 1] && parseInt(arr[row + 1][col]) === nextIndex) {
        search(++nextIndex, row + 1, col)
    }

    if (parseInt(arr[row][col + 1]) === nextIndex) {
        search(++nextIndex, row, col + 1)
    }

    if (parseInt(arr[row][col - 1]) === nextIndex) {
        search(++nextIndex, row, col - 1)
    }
}


const trailhead = findNextTrailhead()
const { row, col } = trailhead
search(nextIndex, row, col)

console.log(arr.map(s => s.join("")))
console.log(count)
