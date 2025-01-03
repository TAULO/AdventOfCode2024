import {
    fileReader
} from '../../Helper.js'

const data = await fileReader('Input.txt');

const parseData = (data) => {
    const blocks = data.trim().split('\n\n'); // Split into blocks based on empty lines
    return blocks.map(block => {
        const lines = block.split('\n'); // Split each block into lines
        const buttonA = /Button A: X\+(\d+), Y\+(\d+)/.exec(lines[0]);
        const buttonB = /Button B: X\+(\d+), Y\+(\d+)/.exec(lines[1]);
        const prize = /Prize: X=(\d+), Y=(\d+)/.exec(lines[2]);

        return {
            buttonA: {
                x: parseInt(buttonA[1], 10),
                y: parseInt(buttonA[2], 10),
            },
            buttonB: {
                x: parseInt(buttonB[1], 10),
                y: parseInt(buttonB[2], 10),
            },
            prize: {
                x: parseInt(prize[1], 10),
                y: parseInt(prize[2], 10),
            }
        };
    });
};

const result = parseData(data);

let res = 0

for (let i = 0; i < result.length; i++) {
    const { buttonA, buttonB, prize } = result[i]

    const count = findButtonPressed(prize.x, prize.y, buttonA, buttonB);

    res += count
}

console.log(res) // 29438


function findButtonPressed(prizeX, prizeY, buttonA, buttonB) {
    const res = [];

    for (let a = 0; a <= 100; a++) {
        const xAX = a * buttonA.x;
        const yAY = a * buttonA.y;

        for (let b = 0; b <= 100; b++) {
            const xBX = b * buttonB.x;
            const yBY = b * buttonB.y;

            if (xAX + xBX === prizeX && yAY + yBY === prizeY) {
                const cost = a * 3 + b;
                res.push(cost);
            }
        }
    }

    return res.length ? Math.min(...res) : 0;
}