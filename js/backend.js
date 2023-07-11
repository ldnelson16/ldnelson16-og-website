import readline from "readline";
//import fs from "fs";
//import FileReader from "FileReader";
  fs.readFile(input, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Split the lines by newline character
    const lines = data.split('\n');

    // Create an HTML table string
    let tableHtml = '<table>\n';

    // Loop through each line and add it as a table row with a cell
    lines.forEach((line) => {
      // Remove leading/trailing white spaces from the line
      const trimmedLine = line.trim();

      // Skip empty lines
      if (trimmedLine === '') return;

      // Add the line as a table row with a cell
      tableHtml += `<tr><td>${trimmedLine}</td></tr>\n`;
    });

    tableHtml += '</table>';
    console.log(tableHtml);

    // Write the generated HTML into an output file
    /*fs.writeFile('output.html', tableHtml, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log('Output file generated successfully!');
    });*/
  });


handleFiles("data.txt");
