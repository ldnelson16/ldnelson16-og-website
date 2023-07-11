import readline from "readline";
import fs from "fs";
//import FileReader from "FileReader";

function readFileLines(filename) {
  return new Promise((resolve, reject) => {
    const lines = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(filename),
      crlfDelay: Infinity
    });

    rl.on('line', line => {
      lines.push(line);
    });

    rl.on('close', () => {
      resolve(lines);
    });

    rl.on('error', error => {
      reject(error);
    });
  });
}

// Usage example:
function readFileLine(a) {
  a.then(lines => {
    console.log(lines); // Array containing each line of the file
  })
  .catch(error => {
    console.error(error); // Error reading the file
  });
}

let d;
d=readFileLines("data.txt").then(
  (lines) => {
    console.log(lines[0]);
    let dates=lines[0];
  }
);
console.log(text);
console.log(d);
//console.log(readFileLines("data.txt"));
