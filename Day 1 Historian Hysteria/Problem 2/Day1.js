import { fileReader } from '../../Helper.js'

const data = await fileReader('input.txt');

const arr = data.split('\n');

const list1 = [];
const list2 = [];

arr.forEach(s => {
    list1.push(s.slice(0, 5))
    list2.push(s.slice(8))
})

let res = 0

for (let i = 0; i < list1.length; i++) {
    let count = 0;
    let num1 = list1[i];

    for (let j = 0; j < list2.length; j++) {
        let num2 = list2[j];

        if (num1 === num2) {
            count++;
        }
    }

    res += num1 * count;
}

console.log(res)