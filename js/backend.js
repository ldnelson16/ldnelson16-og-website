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
  const appendabledropdown = `<label for="`+dropdownid+`" id="`+dropdownlabelid+`">`+labeltext+`</label><select id = "`+dropdownid+`" onchange="changeTableColumns()"></select>`;
  console.log(appendabledropdown);
  $("#body").append($(appendabledropdown));
  for(let i=0;i<dates.length;++i){
    if (i!=dates.length-1){
      $("#"+dropdownid).append(`<option value="`+dates[i]+`">`+dates[i]+`</option>`);
    }
    else {
      $("#"+dropdownid).append(`<option selected="selected" value="`+dates[i]+`">`+dates[i]+`</option>`);
    }
  }
  return $;
}
function addTable($,tableid,dates){
  $("#body").append(`<table id="`+tableid+`"></table>`)
  let appendstr = `<thead><tr><th>Name</th>`;
  //$("#"+tableid).append(`<thead><tr><th>Name</th>`);
  let arr = ["ON3","247","ESPN","Rivals"];
  for (let i=0;i<dates.length;++i){
    for (let j=0;j<arr.length;++j){
      appendstr+=`<th class="data">`+arr[j]+`</th>`;
    }
  }
  appendstr+=`<th>Position</th><th>City</th><th>State</th><th>Team</th></tr></thead>`+`<tbody id="`+tableid+`tbody"></tbody>`;
  $("#"+tableid).append(appendstr);
  //$("#"+tableid).append(`<tbody id="`+tableid+`tbody"></tbody>`);
}
function addTableElementAsPlayer($,playerstring,dates,tbodyid){
  const playerdata=playerstring.split("\t");
  const ron3 = playerdata[1].replaceAll("[","").replaceAll("]","").replaceAll(" ","").replaceAll("'","").split(",");
  const r247 = playerdata[2].replaceAll("[","").replaceAll("]","").replaceAll(" ","").replaceAll("'","").split(",");
  const respn = playerdata[3].replaceAll("[","").replaceAll("]","").replaceAll(" ","").replaceAll("'","").split(",");
  const rrivals = playerdata[4].replaceAll("[","").replaceAll("]","").replaceAll(" ","").replaceAll("'","").split(",");
  let team;
  if(playerdata[8]=="True"){team = playerdata[9];}
  else {team = "Uncommitted";}
  let appendstr = `<tr><td>`+playerdata[0]+`</td>`;
  //$("#"+tbodyid).append(`<tr><td>`+playerdata[0]+`</td>`);
  for (let i=0;i<dates.length;++i){
    appendstr+=`<td class="data">`+ron3[i]+`</td>`+`<td class="data">`+r247[i]+`</td>`+`<td class="data">`+respn[i]+`</td>`+`<td class="data">`+rrivals[i]+`</td>`;
    //$("#"+tbodyid).append(`<td>`+ron3[i]+`</td>`+`<td>`+r247[i]+`</td>`+`<td>`+respn[i]+`</td>`+`<td>`+rrivals[i]+`</td>`)
  }
  appendstr+=`<td>`+playerdata[5]+`</td><td>`+playerdata[6]+`</td><td>`+playerdata[7]+`</td><td>`+team+`</td></tr>`;
  $("#"+tbodyid).append(appendstr);
}




//IMPLEMENTATION OF FILE
let $ = writeHTMLSingleColumnFrameworkFile("singlecolumnframework.html");
$=fillHeader($,"h2","H2");
let d=await readFileLines("data.txt").then(
  (lines) => {
    let dates=lines[0].split(" ");
    lines.shift();
    $=addDatesDropdown($,dates,"Label","dropdown","dropdownlabel");
    addTable($,"tableid",dates);
    for(let line in lines){
      addTableElementAsPlayer($,lines[line],dates,"tableid"+"tbody");
    }
  }
);
writeFile("newtestingrecruiting.html",$);
