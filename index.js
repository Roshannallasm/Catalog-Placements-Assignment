const fs = require('fs');

function readInput(filename) {
    const rawData = fs.readFileSync(filename);
    return JSON.parse(rawData);
}

function decodeYValues(data) {
    const points = [];
    for (const [xStr, rootData] of Object.entries(data)) {
        if (xStr === "keys") continue;
        const x = parseInt(xStr);
        const base = parseInt(rootData.base);
        const yValue = parseInt(rootData.value, base);
        points.push({ x, y: yValue });
    }
    return points;
}

function lagrangeBasis(i, x, points, k) {
    let result = 1;
    for (let j = 0; j < k; j++) {
        if (j !== i) {
            result *= (x - points[j].x) / (points[i].x - points[j].x);
        }
    }
    return result;
}

function findConstantTerm(points, k) {
    let constantTerm = 0;
    for (let i = 0; i < k; i++) {
        const basis = lagrangeBasis(i, 0, points, k);
        constantTerm += points[i].y * basis;
    }
    return Math.round(constantTerm);
}

function findSecret(filename) {
    const data = readInput(filename);
    const n = data.keys.n;
    const k = data.keys.k;

    const points = decodeYValues(data);
    const constantTerm = findConstantTerm(points, k);

    return constantTerm;
}

const file1 = 'test_1.json';
const file2 = 'test_2.json';

console.log("Secret for test case 1:", findSecret(file1));
console.log("Secret for test case 2:", findSecret(file2));
