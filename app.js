//1
const allowedChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'A', 'B', 'C', 'D', 'E', 'F', 'G', '1', '2', '3', '4', '5', '6', '7']

function login(password) {
    return password === "ACc2"
}

function brute(maxLengthPassword = 4) {

    for (let passwordLenght = 1; passwordLenght <= maxLengthPassword; passwordLenght++) {

        //генерим стартовый пароль опр. длины котроый заполняется нолями
        let passwordArray = createPasswordArray(passwordLenght)

        do {
            //генерим строку
            let password = createStringFromArray(passwordArray)
            console.log(password);

            if (login(password)) {
                return password
            }

            passwordArray = getNextPasswordArray(passwordArray)

        } while (passwordArray);
    }
    return null
}

function createPasswordArray(arrayLenght) {
    const passwordArray = []
    for (let i = 0; i < arrayLenght; i++) {
        passwordArray.push(0)
    }
    return passwordArray
}

//массив с числами превратить в массив с символами
function createStringFromArray(passwordArray) {
    let password = ''
    for (let i = 0; i < passwordArray.length; i++) {
        password += allowedChars[passwordArray[i]]
    }
    return password
}

function getNextPasswordArray(passwordArray) {
    for (let i = passwordArray.length - 1; i >= 0; i--) {
        if (passwordArray[i] < allowedChars.length - 1) {
            passwordArray[i]++;
            return passwordArray;
        }

        passwordArray[i] = 0;
    }

    return null
}

console.time();
console.log(brute());
console.timeEnd()



//2
const allowedChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'A', 'B', 'C', 'D', 'E', 'F', 'G', '1', '2', '3', '4', '5', '6', '7']

function login(password) {
    return password === "abc7"
}

function* brute(maxLengthPassword) {

    for (let passwordLenght = 1; passwordLenght <= maxLengthPassword; passwordLenght++) {
        //генерим стартовый пароль опр. длины который заполняется нолями
        let passwordArray = createPasswordArray(passwordLenght)

        do {
            //генерим строку
            yield createStringFromArray(passwordArray)
            passwordArray = getNextPasswordArray(passwordArray)

        } while (passwordArray);
    }
}

function createPasswordArray(arrayLenght) {
    const passwordArray = []
    for (let i = 0; i < arrayLenght; i++) {
        passwordArray.push(0)
    }
    return passwordArray
}

//массив с числами превратить в массив с символами
function createStringFromArray(passwordArray) {
    let password = ''
    for (let i = 0; i < passwordArray.length; i++) {
        password += allowedChars[passwordArray[i]]
    }
    return password
}

function getNextPasswordArray(passwordArray) {
    for (let i = passwordArray.length - 1; i >= 0; i--) {
        if (passwordArray[i] < allowedChars.length - 1) {
            passwordArray[i]++;
            return passwordArray;
        }
        passwordArray[i] = 0;
    }
    return null
}


console.time();

const iterator = brute(4)
for (let password of iterator) {
    console.log(password)
    if (login(password)) {
        console.log("password\t", password)
        break
    }
}
console.timeEnd()



//3
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
