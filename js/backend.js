import readline from "readline";
import fs from "fs";
import cheerio from "cheerio";
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
function fillHeader($,type,text){
  try {
    $("#header").append($(`<`+type+`>`+text+`</`+type+`>`));
  }
  catch (error) {
    console.log("Caught error filling header with "+text);
  }
  return $;
}
function writeHTMLSingleColumnFrameworkFile(frameworkfilepath) {
  const html = fs.readFileSync(frameworkfilepath,"utf-8");
  const $ = cheerio.load(html);
  return $;
}
function writeFile(filename,$){
  //Converting html from Cheerio object to String
  const stringHTML = $.html();
  //Writing file to the given filename
  fs.writeFile(filename,stringHTML,err => {
    if (err) {
      console.error('Error writing to '+filename, err);
    } else {
      console.log(filename+' file has been successfully created.');
    }
  });
}
function addDatesDropdown($,dates,labeltext,dropdownid,dropdownlabelid) {
  const appendabledropdown = `<label for="`+dropdownid+`" id="`+dropdownlabelid+`">`+labeltext+`</label><select id = "`+dropdownid+`"></select>`;
  console.log(appendabledropdown);
  $("#body").append($(appendabledropdown));
  for(let date in dates){
    $("#"+dropdownid).append(`<option value="`+dates[date]+`">`+dates[date]+`</option>`);
  }
  return $;
}




//IMPLEMENTATION OF FILE
let $ = writeHTMLSingleColumnFrameworkFile("singlecolumnframework.html");
$=fillHeader($,"h2","H2");
let d=await readFileLines("data.txt").then(
  (lines) => {
    let dates=lines[0].split(" ");
    console.log(dates);
    $=addDatesDropdown($,dates,"Label","dropdown","dropdownlabel");
    console.log($.html());
  }
);
console.log($.html());
writeFile("newtestingrecruiting.html",$);
