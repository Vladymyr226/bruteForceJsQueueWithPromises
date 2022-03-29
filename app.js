const password = "AC84"
const allowedSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'A', 'B', 'C', 'D', 'E', 'F', 'G', '1', '2', '3', '4', '5', '6', '7', '8', '9'].join('');

let brut = ""

const checked = [];
let duplicates = 0;

console.time();

while (brut !== password) {

    brut = ""

    for (let i = 0; i < password.length; i++) {
        let index = Math.floor(Math.random() * allowedSymbols.length)
        brut += allowedSymbols.substring(index, index + 1)
        console.log(brut)
    }
    checked.includes(brut) ? duplicates++ : checked.push(brut)
}

console.log("duplicates:\t", duplicates);
console.log(brut, "Done, I find!")

console.timeEnd();
