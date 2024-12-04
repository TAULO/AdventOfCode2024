import {fileReader} from '../../Helper.js'

const data = await fileReader('Input.txt');

const xmasRegex = /(?=(XMAS|SAMX))/g;

const dataHorizontal = data.split("\n")

function getXMASCount(arr) {
    return arr.map(s => s.match(xmasRegex)?.length ?? 0).reduce((acc, curr) => acc + curr, 0)
}

const dataVertical = []
for (let i = 0; i < dataHorizontal.length; i++) {
    let str = ""
    for (let j = 0; j < dataHorizontal[i].length; j++) {
        str += dataHorizontal[j][i]
    }

    dataVertical.push(str)
}

const traverseDiagonallyBackslash = (array) => {
    const rows = array.length;
    const cols = array[0].length;
    const result = [];

    // Traverse starting from each column of the first row
    for (let col = 0; col < cols; col++) {
        let i = 0, j = col, diagonal = [];
        while (i < rows && j < cols) {
            diagonal.push(array[i][j]);
            i++;
            j++;
        }
        result.push(diagonal.join(""));
    }

    // Traverse starting from each row of the first column
    for (let row = 1; row < rows; row++) {
        let i = row, j = 0, diagonal = [];
        while (i < rows && j < cols) {
            diagonal.push(array[i][j]);
            i++;
            j++;
        }
        result.push(diagonal.join(""));
    }

    return result;
};

// Function to traverse diagonally (/ direction)
const traverseDiagonallySlash = (array) => {
    const rows = array.length;
    const cols = array[0].length;
    const result = [];

    // Traverse starting from each column of the first row
    for (let col = cols - 1; col >= 0; col--) {
        let i = 0, j = col, diagonal = [];
        while (i < rows && j >= 0) {
            diagonal.push(array[i][j]);
            i++;
            j--;
        }
        result.push(diagonal.join(""));
    }

    // Traverse starting from each row of the last column
    for (let row = 1; row < rows; row++) {
        let i = row, j = cols - 1, diagonal = [];
        while (i < rows && j >= 0) {
            diagonal.push(array[i][j]);
            i++;
            j--;
        }
        result.push(diagonal.join(""));
    }

    return result;
};

const d1 = traverseDiagonallyBackslash(dataHorizontal)
const d2 = traverseDiagonallySlash(dataHorizontal)

const horizontalCount = getXMASCount(dataHorizontal)
const verticalCount = getXMASCount(dataVertical)
const d1Count = getXMASCount(d1)
const d2Count = getXMASCount(d2)

console.log(horizontalCount + verticalCount + d1Count + d2Count) // 2458