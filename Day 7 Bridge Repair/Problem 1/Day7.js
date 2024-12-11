import {
    fileReader
} from '../../Helper.js'

const data = await fileReader('Input.txt');

const arr = data.split("\n")

const results = []

for (let i = 0; i < arr.length; i++) {
    const line = arr[i]

    const [resultStr, numsStr] = line.split(":")

    const result = parseInt(resultStr)
    const nums = numsStr.trim().split(" ")

    let found = false
    let index = 0
    while (!found && index < 10000) {
        const bf = bruteForceCombination(nums)
        let res = 0
        
        bf.split("|").forEach(s => {

            if (s[0] === "+") {
                res += parseInt(s.slice(1))
            } else if (s[0] === "*") {
                res *= parseInt(s.slice(1))
            } else {
                res = parseInt(s)
            }
        })

        if (res === parseInt(result)) {
            results.push(res)
            found = true
        }

        index++
    }
}

function bruteForceCombination(nums) {
    const operations = ["|*", "|+"]

    return nums.map((s, index) => {
        const rand = Math.round(Math.random())

        return index === nums.length - 1 ? s : s + operations[rand]
    }).join("")
}

console.log(results.reduce((acc, curr) => acc + curr)) // 303766880536