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

let d=readFileLines("data.txt").then(
  (lines) => {
    console.log(lines[0]);
    let dates=lines[0];
    fs.writeFile('testingindex.html', lines[0], err => {
      if (err) {
        console.error('Error writing to index.html:', err);
      } else {
        console.log('testingindex.html file has been created.');
      }
    });
  }
);
console.log(d);
//console.log(readFileLines("data.txt"));
