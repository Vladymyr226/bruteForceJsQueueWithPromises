class Queue {
    constructor(checkLogin, limit, generator) {
        this.checkLogin = checkLogin;
        this.limit = limit;
        this.generator = generator
        this.rightPassword = null;
    }

    start() {
        for (let i = 0; i < this.limit; i++) {
            this.service(this.checkLogin)
        }
    }

    service(tryMakelogin) {
        if (this.rightPassword === null) {
            tryMakelogin(this.generator.next().value).then(result => {
                console.log("result", result);
                this.rightPassword = result;
            })
        }
        else this.service(this.checkLogin)
    }
}





const allowedChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'A', 'B', 'C', 'D', 'E', 'F', 'G', '1', '2', '3', '4', '5', '6', '7']

function login(password) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            password === "a7" ? resolve(password) : console.log("***");
        }, Math.floor(Math.random() * 5) * 1000)
    })
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

const iterator = brute(4);

const q = new Queue(login, 10, iterator)
q.start()

console.log(login("a7").then((result) => { console.log(result) }))

console.timeEnd();