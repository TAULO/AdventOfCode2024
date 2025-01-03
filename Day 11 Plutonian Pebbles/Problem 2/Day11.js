import {
    fileReader
} from '../../Helper.js'

const data = await fileReader('TestInput.txt');

let nums = data.split(" ")

const max = 6

const memo = {}

let sizes = []

function prob2(index, arr) {
    if (index >= max) return arr.length;

    const res = [];

    for (let i = 0; i < arr.length; i++) {
        const n = arr[i];

        if (n === "0") {
            res.push("1");
        }

        if (n.length % 2 === 0) {
            if (!memo[n]) {
                const n1 = parseInt(n.slice(0, n.length / 2))
                const n2 = parseInt(n.slice(n.length / 2))

                memo[n] = { n1, n2 }
            }

            const { n1, n2 } = memo[n]

            res.push(n1.toString());
            res.push(n2.toString());
        } else {
            if (!memo[n]) {
                memo[n] = [(parseInt(n) * 2024).toString()];
            }

            res.push(memo[n][0]);
        }
    }

    return prob2(++index, res);
}

const s = prob2(0, nums)

console.log(sizes, s)
