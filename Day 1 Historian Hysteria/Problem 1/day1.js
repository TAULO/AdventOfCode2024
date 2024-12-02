import { fileReader } from '../../Helper.js'

const data = await fileReader('input.txt');

const arr = data.split('\n');

const list1 = [];
const list2 = [];

arr.forEach(s => {
    list1.push(s.slice(0, 5))
    list2.push(s.slice(8))
})

const sorted1 = list1.sort((a, b) => a - b);
const sorted2 = list2.sort((a, b) => a - b);

let res = 0

for (let i = 0; i < sorted1.length; i++) {
    let num1 = parseInt(sorted1[i]);
    let num2 = parseInt(sorted2[i]);

    let curr = num1 - num2;

    if (curr < 0) {
        res += curr * -1
    } else {
        res += curr
    }
}

console.log(res); // 1889772




