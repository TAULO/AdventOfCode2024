import { fileReader } from '../../Helper.js'

const data = await fileReader('input.txt');

const arr = data.split('\n');

let count = 0;

function isIncreasing(array) {
    return array.every((val, i, arr) => i === 0 || arr[i - 1] < val);
}

function isDecreasing(array) {
    return array.every((val, i, arr) => i === 0 || arr[i - 1] > val);
}

for (let i = 0; i < arr.length; i++) {
    const nums = arr[i].split(' ').map(Number);

    if (!isIncreasing(nums) && !isDecreasing(nums)) {
        console.log("Unsafe at level: " + (i + 1) + " (decreasing | increasing)")
        console.log(nums)
        console.log("\n")
        count++
        continue;
    }

    for (let j = 0; j < nums.length; j++) {
        if (!nums[j + 1]) break;

        let curr = nums[j]
        let next = nums[j + 1];

        let n = curr - next > 0 ? curr - next : (curr - next) * -1

        if ((n > 3 || curr === next)) {
            console.log("Unsafe at level: " + (i + 1) + " (n > 3 | n == n)")
            console.log(nums)
            console.log("\n")
            count++;
            break;
        }
    }
}

console.log(arr.length - count) // 534