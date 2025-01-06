import {fileReader} from '../../Helper.js'

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

    if (robotCount[posY][posX] >= 0) {
        robotCount[posY][posX] += 1;
    } else {
        robotCount[posY][posX] = 1;
    }

    grid[posY][posX] = robotCount[posY][posX].toString();

    if (robotCount[resetY][resetX] > 1) {
        robotCount[resetY][resetX] -= 1;
        grid[resetY][resetX] = robotCount[resetY][resetX].toString();
    } else {
        robotCount[resetY][resetX] = 0;
        grid[resetY][resetX] = ".";
    }

    data.positions.posY = posY;
    data.positions.posX = posX;
}


let arr = data.split("\n")

function setInitState() {
    for (let i = 0; i < arr.length; i++) {
        const [positions, velocities] = arr[i].split(" ")

        const [posX, posY] = positions.slice(2).split(",").map(Number)
        const [volX, volY] = velocities.slice(2).split(",").map(Number)

        if (grid[posY][posX] !== ".") {
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

        setPositions(data, data.positions.posY, data.positions.posX, data.velocities.volY, data.velocities.volX)
    }

    // console.log(i + 1, grid.map(s => s.join("")))
}

function calculateSafetyFactor() {
    const midY = Math.floor(tall / 2);
    const midX = Math.floor(wide / 2);

    const quadrants = [0, 0, 0, 0];
    for (let y = 0; y < tall; y++) {
        for (let x = 0; x < wide; x++) {
            if (y === midY || x === midX) continue; // Ignore middle lines
            const quadrant = (y < midY ? 0 : 2) + (x < midX ? 0 : 1);
            quadrants[quadrant] += robotCount[y][x];
        }
    }

    return quadrants.reduce((product, count) => product * count, 1);
}

console.log(calculateSafetyFactor()); // 222208000

