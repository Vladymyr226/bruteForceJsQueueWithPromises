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