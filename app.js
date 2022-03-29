const password = "ACA9"
const allowedSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'A', 'B', 'C', 'D', 'E', 'F', 'G', '1', '2', '3', '4', '5', '6', '7', '8', '9'].join('');


let brut = ""

const checked = [];
let duplicates = 0;

console.time();

while (brut !== password) {

    for (let i = 0; i < password.length; i++) {
        let index = Math.floor(Math.random() * allowedSymbols.length)
        brut += allowedSymbols.substring(index, index + 1)
        console.log(brut)
    }

    if (!checked.includes(brut)) {
        checked.push(brut);
    } else {
        duplicates++;
    }

    if (brut === password) {
        console.log("duplicates:\t", duplicates);
        console.log(brut, "Done, I find!")
        break
    }

    brut = ""
}

console.timeEnd();
