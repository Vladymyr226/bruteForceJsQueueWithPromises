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
