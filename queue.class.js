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

const queue = new Queue(10);

const payload = (index) => new Promise((resolve) => {
  console.log('task ' + index + ' started executing');

  setTimeout(() => resolve(false), Math.floor(Math.random() * 5) * 1000);

});

for (let i = 0; i < 50; i++) {
  console.log('Task for index ' + i + ' added to queue');
  queue.add([payload, i]);
}

console.log(queue);

queue.addEventListener("onSuccess", (result, task) => {

  console.log(result, task);
});

console.log(queue);