import readline from "readline";
import fs from "fs";
import cheerio from "cheerio";
import { Player } from "./playerclass.js";
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
function addTable($,tableid){
  $("#body").append(`<table id="`+tableid+`"></table>`)
  $("#"+tableid).append(`<thead><tr><th>Name</th><th>ON3</th><th>247</th><th>ESPN</th><th>Rivals</th><th>Position</th><th>City</th><th>State</th><th>Team</th></tr></thead>`);
  $("#"+tableid).append(`<tbody id="tbody"></tbody>`);
}
function addTableElementAsPlayer($,playerstring){
  const playerdata=playerstring.split("\t");
  const on3 = playerdata[1].replaceAll("[","").replaceAll("]","").replaceAll(" ","").replaceAll("'","").split(",");
  console.log(on3+typeof on3+on3[0]);
  $("#tbody").append(`<tr>
  <td>`+playerdata[0]+`</td>
  <td>`+playerdata[1]+`</td>
  <td>`+playerdata[2]+`</td>
  <td>`+playerdata[3]+`</td>
  <td>`+playerdata[4]+`</td>
  <td>`+playerdata[5]+`</td>
  <td>`+playerdata[6]+`</td>
  <td>`+playerdata[7]+`</td>
  <td>`+playerdata[8]+`</td>
  </tr>`);

  //Zina Umeozulu   ['91', '91', '91', '91', '91', '90']    ['90', '90', '90', '90', '90', '90']    ['86', '86', '86', '86', '86', '86']    ['5.8', '5.8', '5.0', '5.8', '5.8', '5.8']      EDGE    Allen   TX      False   False
}




//IMPLEMENTATION OF FILE
let $ = writeHTMLSingleColumnFrameworkFile("singlecolumnframework.html");
$=fillHeader($,"h2","H2");
let d=await readFileLines("data.txt").then(
  (lines) => {
    let dates=lines[0].split(" ");
    lines.shift();
    $=addDatesDropdown($,dates,"Label","dropdown","dropdownlabel");
    addTable($,"tableid");
    for(let line in lines){
      addTableElementAsPlayer($,lines[line]);
    }
  }
);
writeFile("newtestingrecruiting.html",$);
