const axios = require('axios');



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

//массив с числами превращаем в массив с символами
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










class Queue {
    constructor() {
        this.arrayPromises = Array(100).fill(new Promise((resolve, reject) => {
            setTimeout(() => {
                // resolve('good');
            }, 500);
        }))
    }

    takePackPromises = async () => {
        while (!this.arrayPromises.length == 0) {

            for (let i = 1; i < 21; i++) {
                await axios({
                    method: 'get',
                    url: 'https://api.privatbank.ua/p24api/exchange_rates?json&date=31.03.2022'
                })
                    .then(response => {
                        console.log("Try to login №\t", i);
                        this.arrayPromises.pop(i);
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });
            }
        }
    }

    get promises() {
        return this.arrayPromises;
    }
}

const q = new Queue();
// console.log(q.promises);
q.takePackPromises()
