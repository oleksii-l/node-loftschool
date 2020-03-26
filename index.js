const program = require("./utils/commander");
program.parse(process.argv);

const express = require("express");
const app = express();

let connections = [];
let isFinished = true;

app.get("/", (req, res, next) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked"); // https://en.wikipedia.org/wiki/Chunked_transfer_encoding
  connections.push(res);

  console.log(`isFinished=${isFinished}`);

  if (isFinished) {
    isFinished = false;
    const intervalId = setInterval(() => {
      const currDate = new Date();
      console.log(`Current server date is ${currDate}\n`);
    }, program.interval);

    setTimeout(() => {
      connections.map(res => {
        const currDate = new Date();
        res.write(`Time of closing connection is ${currDate}\n`);
        res.write("END\n");
        res.end();
      });

      connections = [];
      clearInterval(intervalId);
      isFinished = true;

      console.log("Timeout is elepsed. Finished.\n");
    }, program.timeout);
  }
});

console.log(`Timeout is ${program.timeout}ms`);
console.log(`Interval is ${program.interval}ms`);

app.listen(3000, function() {
  console.log("App listening on port 3000!");
});
