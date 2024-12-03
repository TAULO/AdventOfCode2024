import { fileReader } from '../../Helper.js'

const data = await fileReader('Input.txt');

const res = data.match(/mul\(\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*\)/g).map(s => {
    const commaIndex = s.indexOf(",")
    const endParenthesisIndex = s.indexOf(")")

    const n1 = s.slice(4, commaIndex)
    const n2 = s.slice(commaIndex + 1, endParenthesisIndex)

    console.log(`${parseInt(n1)} * ${parseInt(n2)}`)

    return parseInt(n1) * parseInt(n2)
}).reduce((acc, curr) => {
    return acc + curr
})

console.log(res) // 178886550
