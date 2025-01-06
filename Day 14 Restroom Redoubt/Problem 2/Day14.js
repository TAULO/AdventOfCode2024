import {fileReader} from '../../Helper.js'
import fs  from "node:fs";

const data = await fileReader('Input.txt');

const wide = 101
const tall = 103

function createGrid() {
    const grid = []
    const robotCount = []

    for (let i = 0; i < tall; i++) {
        let inner = []
        let robotCountInner = []
        for (let j = 0; j < wide; j++) {
            inner.push(".")
            robotCountInner.push(0)
        }
        grid.push(inner)
        robotCount.push(robotCountInner)
    }

    return { grid, robotCount}
}

const { grid, robotCount} = createGrid();

function setPositions(data, posY, posX, volY, volX) {

    let finalY = 0
    let finalX = 0

    const nextYPos = posY + volY
    const nextXPos = posX + volX

    if (nextYPos >= tall) {
        finalY = nextYPos - tall
    } else if (nextYPos < 0) {
        finalY = nextYPos + tall
    } else {
        finalY = nextYPos
    }

    if (nextXPos >= wide) {
        finalX = nextXPos - wide
    } else if (nextXPos < 0) {
        finalX = nextXPos + wide
    } else {
        finalX = nextXPos
    }

    drawPos(data, finalY, finalX, posY, posX)
}

function drawPos(data, posY, posX, resetY, resetX) {

    // if (robotCount[posY][posX] >= 0) {
    //     robotCount[posY][posX] += 1;
    // } else {
    //     robotCount[posY][posX] = 1;
    // }
    //
    // grid[posY][posX] = robotCount[posY][posX].toString();
    //
    // if (robotCount[resetY][resetX] > 1) {
    //     robotCount[resetY][resetX] -= 1;
    //     grid[resetY][resetX] = robotCount[resetY][resetX].toString();
    // } else {
    //     robotCount[resetY][resetX] = 0;
    //     grid[resetY][resetX] = ".";
    // }

    grid[posY][posX] = "X"
    grid[resetY][resetX] = " ";
    data.positions.posY = posY;
    data.positions.posX = posX;
}


let arr = data.split("\n")

function setInitState() {
    for (let i = 0; i < arr.length; i++) {
        const [positions, velocities] = arr[i].split(" ")

        const [posX, posY] = positions.slice(2).split(",").map(Number)
        const [volX, volY] = velocities.slice(2).split(",").map(Number)

        grid[posY][posX] = "X"
    }
}

setInitState()

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

let tree = []
let index = 10000
function christmasTree(numOfSeconds) {

    while (numOfSeconds <= index) {
        for (let j = 0; j < dataObj.length; j++) {
            const data = dataObj[j]

            setPositions(data, data.positions.posY, data.positions.posX, data.velocities.volY, data.velocities.volX)
        }
        fs.appendFileSync("ChristmasTree", numOfSeconds + "\n" + grid.map(s => s.join("")).join("\n") + "\n\n")
        numOfSeconds++
    }

}

christmasTree(1)

// Christmas tree was found 7623 seconds




