import {
    fileReader
} from '../../Helper.js'

const data = await fileReader('Input.txt');

const blocks = []

let id = 0
for (let i = 0; i < data.length; i++) {
    let num = parseInt(data[i])
    let isFileBlock = i % 2 === 0

    for (let j = 0; j < num; j++) {
        if (isFileBlock) {
            blocks.push(id)
        } else {
            blocks.push(".")
        }
    }

    if (isFileBlock) {
        id++
    }
}

// console.log(blocks.join(""))

for (let i = blocks.length - 1; i >= 0; i--) {
    let dotIndex = 0
    let block = blocks[i]

    while (blocks[dotIndex] !== ".") {
        dotIndex++
    }

    blocks[dotIndex] = block

    blocks[i]  = "."
}

const res = blocks.reduce((acc, curr, index) => {
    if (curr !== ".") {
        return acc + (index - 1) * parseInt(curr)
    }
    return acc
}, 0)

console.log(res)