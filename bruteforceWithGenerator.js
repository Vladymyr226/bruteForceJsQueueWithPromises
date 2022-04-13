const allowedChars = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
];

function login(password) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(password === 'a7');
    }, Math.floor(Math.random() * 5) * 1000);
  });
}

function* brute(maxLengthPassword) {
  for (
    let passwordLenght = 1;
    passwordLenght <= maxLengthPassword;
    passwordLenght++
  ) {
    //генерим стартовый пароль опр. длины который заполняется нолями
    let passwordArray = createPasswordArray(passwordLenght);

    do {
      //генерим строку
      yield createStringFromArray(passwordArray);
      passwordArray = getNextPasswordArray(passwordArray);
    } while (passwordArray);
  }
}

function createPasswordArray(arrayLenght) {
  const passwordArray = [];
  for (let i = 0; i < arrayLenght; i++) {
    passwordArray.push(0);
  }
  return passwordArray;
}

//массив с числами превратить в массив с символами
function createStringFromArray(passwordArray) {
  let password = '';
  for (let i = 0; i < passwordArray.length; i++) {
    password += allowedChars[passwordArray[i]];
  }
  return password;
}

function getNextPasswordArray(passwordArray) {
  for (let i = passwordArray.length - 1; i >= 0; i--) {
    if (passwordArray[i] < allowedChars.length - 1) {
      passwordArray[i]++;
      return passwordArray;
    }
    passwordArray[i] = 0;
  }
  return null;
}

class Queue {
  constructor(limit) {
    this.limit = limit;
    this.tasks = [];
    this.taskInProgress = 0;
  }

  add(item) {
    this.tasks.push(item);
    this.execute();
  }

  execute() {
    if (this.tasks.length === 0 || this.taskInProgress >= this.limit) {
      return;
    }

    let task = this.tasks.shift();
    this.taskInProgress++;

    task[0](task[1])
      .then((result) => {
        this.taskInProgress--;
        this.onSuccess && this.onSuccess(result, task);
        this.execute();

      })
      .catch((err) => {
        this.taskInProgress--;
        this.onError && this.onError();
        this.execute();
      });
  }

  addEventListener(event, cb) {
    this[event] = cb;
  }

}

console.time();

const iterator = brute(4);

const q = new Queue(10);


for (let i = 0; i < 10; i++) {
  const result = iterator.next();
  q.add([login, result.value]);
}

let password = null;

q.addEventListener("onSuccess", (isCorrect, task) => {

  if (password) {
    return;
  }

  if (isCorrect) {
    password = task[1];
    console.log(password);
    return;
  }

  const result = iterator.next();
  q.add([login, result.value]);
});

console.timeEnd();
