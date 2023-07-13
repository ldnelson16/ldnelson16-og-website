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
function addTable($,dateid){
  $("#body").append(`<table id="`+dateid+`"></table>`)
  $("#"+dateid).append(`<thead><tr><th>Name</th><th>ON3</th><th>247</th><th>ESPN</th><th>Rivals</th><th>Position</th><th>City</th><th>State</th><th>Team</th></tr></thead>`);
  $("#"+dateid).append(`<tbody id="`+dateid+`tbody"></tbody>`);
}
function addTableElementAsPlayer($,playerstring,dateindex,tbodyid){
  const playerdata=playerstring.split("\t");
  const ron3 = playerdata[1].replaceAll("[","").replaceAll("]","").replaceAll(" ","").replaceAll("'","").split(",");
  const r247 = playerdata[2].replaceAll("[","").replaceAll("]","").replaceAll(" ","").replaceAll("'","").split(",");
  const respn = playerdata[3].replaceAll("[","").replaceAll("]","").replaceAll(" ","").replaceAll("'","").split(",");
  const rrivals = playerdata[4].replaceAll("[","").replaceAll("]","").replaceAll(" ","").replaceAll("'","").split(",");
  let team;
  if(playerdata[8]=="True"){team = playerdata[9];}
  else {team = "Uncommitted";}
  $("#"+tbodyid).append(`<tr><td>`+playerdata[0]+`</td><td>`+ron3[dateindex]+`</td><td>`+r247[dateindex]+`</td><td>`+respn[dateindex]+`</td><td>`+rrivals[dateindex]+`</td><td>`+playerdata[5]+`</td><td>`+playerdata[6]+`</td><td>`+playerdata[7]+`</td><td>`+team+`</td></tr>`);
}




//IMPLEMENTATION OF FILE
let $ = writeHTMLSingleColumnFrameworkFile("singlecolumnframework.html");
$=fillHeader($,"h2","H2");
let d=await readFileLines("data.txt").then(
  (lines) => {
    let dates=lines[0].split(" ");
    lines.shift();
    $=addDatesDropdown($,dates,"Label","dropdown","dropdownlabel");
    for(let date in dates){
      addTable($,dates[date]);
      for(let line in lines){
        addTableElementAsPlayer($,lines[line],dates[date],dates[date]+"tbody");
      }
    }
  }
);
writeFile("newtestingrecruiting.html",$);
