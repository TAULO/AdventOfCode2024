import { fileReader } from '../../Helper.js'

const data = await fileReader('Input.txt');

const arr = data.split('\n');

function isIncreasing(array) {
    return array.every((val, i, arr) => i === 0 || arr[i - 1] < val);
}

function isDecreasing(array) {
    return array.every((val, i, arr) => i === 0 || arr[i - 1] > val);
}

function isLevelUnsafe(level) {
    if (!isIncreasing(level) && !isDecreasing(level)) {
        return true;
    }

    for (let j = 0; j < level.length; j++) {
        if (!level[j + 1]) break;

        let curr = level[j]
        let next = level[j + 1];

        let n = curr - next > 0 ? curr - next : (curr - next) * -1

        if ((n > 3 || curr === next)) {
            return true
        }
    }
}


let isSafedCount = 0;

for (let i = 0; i < arr.length; i++) {
    let levels = arr[i].split(' ').map(Number);

    let index = 0;

    const isUnsave = isLevelUnsafe(levels);

    if (isUnsave) {
        while (levels.length > index) {
            let newLevel = []
            newLevel = levels.slice(0, index).concat(levels.slice(index + 1));

            const isSafe = !isLevelUnsafe(newLevel);

            if (isSafe) {
                console.log("Level: " + (i + 1)  + " is safe")
                isSafedCount++
                break;
            }

            index++
        }
    } else {
        isSafedCount++
        console.log("Level: " + (i + 1)  + " is safe")
    }
}

console.log(isSafedCount)
