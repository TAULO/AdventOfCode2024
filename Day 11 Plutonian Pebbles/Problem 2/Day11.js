import {
    fileReader
} from '../../Helper.js'

const data = await fileReader('Input.txt');

let nums = data.split(" ")

const max = 75

const memoize = (func) => {
    const results = {};
    return (...args) => {
      const argsKey = JSON.stringify(args);
      if (!results[argsKey]) {
        results[argsKey] = func(...args);
      }
      return results[argsKey];
    };
  };
  

function foo(index, arr) {    
    if (index >= max) return arr.length

    let res = []

    arr.forEach(n => {
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

    return foo(++index, res)
}

const res = memoize(() => foo(0, nums))

console.log(res())