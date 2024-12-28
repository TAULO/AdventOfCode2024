import {
    fileReader
} from '../../Helper.js'

const data = await fileReader('Input.txt');

let nums = data.split(" ")

for (let i = 0; i < 25; i++) {
    let res = []

    nums.forEach(n => {
        if (n === "0") {
            res.push("1")
        } else if (n.length % 2 === 0) {
            const n1 = parseInt(n.slice(0, n.length / 2))
            const n2 = parseInt(n.slice(n.length / 2))

            res.push(n1 + "")
            res.push(n2 + "")
        } else {
            res.push(parseInt(n) * 2024 + "")
        }
    })

    nums = res
}


console.log(nums.length) // 233875