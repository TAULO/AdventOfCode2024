import {
    fileReader
} from '../../Helper.js'

const data = await fileReader('Input.txt');

const arr = data.split("\n")

let answ = 0

let results = []

const maxRetries = 100000

for (let i = 0; i < arr.length; i++) {
    const line = arr[i]

    const [resultStr, numsStr] = line.split(":")

    const result = parseInt(resultStr)
    const nums = numsStr.trim().split(" ")

    let found = false
    let index = 0
    while (!found && index < maxRetries) {
        const bf = bruteForceCombination(nums)
        let res = 0

        const bfSplit = bf.split("-")
        for (let j = 0; j < bfSplit.length; j++) {
            let s = bfSplit[j]
            if (s[0] === "+") {
                res += parseInt(s.slice(1))
            } else if (s[0] === "*") {
                res *= parseInt(s.slice(1))
            } else {
                res = parseInt(s)
            }
        }

        if (res === parseInt(result)) {
            answ += res
            results.push(res)
            found = true
        }
        index++
    }

    index = 0
    while (!found && index < maxRetries) {
        let res = 0
        const newBf = bruteForceCombination2(nums)

        const newBfSplit = newBf.split("-").map(s => s.replace("|", ""))

        for (let j = 0; j < newBfSplit.length; j++) {
            let s = newBfSplit[j]
            if (s[0] === "+") {
                res += parseInt(s.slice(1))
            } else if (s[0] === "*") {
                res *= parseInt(s.slice(1))
            } else {
                res = parseInt(s)
            }
        }

        // console.log(newBfSplit, res)

        if (res === parseInt(result)) {
            answ += res
            results.push(res)
            found = true
        }

        index++
    }
}

function bruteForceCombination(nums) {
    const operations = ["-*", "-+"]

    return nums.map((s, index) => {
        const rand = Math.floor(Math.random() * 2);

        return index === nums.length - 1 ? s : s + operations[rand]
    }).join("")
}

function bruteForceCombination2(nums) {
    const operations = ["-*", "-+", "|"]

    return nums.map((s, index) => {
        const rand = Math.floor(Math.random() * 3);

        return index === nums.length - 1 ? s : s + operations[rand]
    }).join("")
}


console.log(answ)