import {fileReader} from '../../Helper.js'

const data = await fileReader('Input.txt');

const dataHorizontal = data.split("\n")

// return 2d array with structure: [ [] [] [] ]
function fillUpArray(arr) {
    let index = 0;

    let n = 0

    let outer = []

    while (index < arr.length) {
        let inner = []
        for (let i = 0; i < 3; i++) {
            let str = ""
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i + n]) {
                    str += arr[i + n][j];
                }
            }

            inner.push(str);
        }

        outer.push(inner)

        n++
        index++
    }

    return outer
}

const res = fillUpArray(dataHorizontal)

// look for X
let count = 0
for (let i = 0; i < res.length; i++) {

    let index = 0
    while (index < res[i][0].length) {
        console.log(res[i]);

        const topLeft = res[i][0][index]
        const topRight = res[i][0][index + 2]

        const middle = res[i][1][index + 1]

        const bottomLeft = res[i][2][index]
        const bottomRight = res[i][2][index + 2]

        console.log(topLeft, topRight)
        console.log("", middle)
        console.log(bottomLeft, bottomRight)

        const str1 = topLeft + middle + bottomRight;
        const str2 = topRight + middle + bottomLeft;

        console.log(str1, str2)

        if ((str1 === "SAM" || str1 === "MAS") && (str2 === "SAM" || str2 === "MAS")) {
            count++
        }

        index++
    }

    console.log("----- NEXT ROW -----")
}

console.log(count) // 1945

