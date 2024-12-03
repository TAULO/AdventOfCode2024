import { fileReader } from '../../Helper.js'

const data = await fileReader('Input.txt');

function calculateMulSum(muls) {
    return muls.map(s => {
        const commaIndex = s.indexOf(",")
        const endParenthesisIndex = s.indexOf(")")

        const n1 = s.slice(4, commaIndex)
        const n2 = s.slice(commaIndex + 1, endParenthesisIndex)

        return parseInt(n1) * parseInt(n2)
    }).reduce((acc, curr) => acc + curr, 0)
}

const doDontMuls = data.match(/(mul\(\d+\,\d+\))|(do\(\))|don't\(\)/g)

const res = []

let shouldAddMul = true

for (let i = 0; i < doDontMuls.length; i++) {
    const curr = doDontMuls[i]

    if (curr === "don't()") {
        shouldAddMul = false
    } else if (curr === "do()") {
        shouldAddMul = true
    }

    if (shouldAddMul && curr !== "do()" && curr !== "don't()") {
        res.push(curr)
    }
}

console.log(calculateMulSum(res)) // 87163705
