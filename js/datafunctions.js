import {Player} from './playerclass.js';
import { Builder, By } from 'selenium-webdriver';
import 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';


function fillList(lst,deslength) {
  if(lst.length<deslength){
    lst.unshift("-");
    fillList(lst,deslength);
  }
  else {
    return lst;
  }
}
function searchAofAs(arr,arrfind,wantindex=false){
  for(let i=0;i<arr.length;++i){
    if(arr[i].includes(arrfind[0])&&arr[i].includes(arrfind[1])){
      if (wantindex) {return i;}
      return true;
    }
  }
  return false;
}
function addPlayer(ron3,r247,respn,rrivals,name,pos,city,state,committed,team,results,nameandcities) {
  let player=new Player(ron3,r247,respn,rrivals,name,pos,city,state,committed,team);
  if (searchAofAs(nameandcities,[name,city])){
    results[searchAofAs(nameandcities,[name,city],true)].ron3.push(ron3);
    results[searchAofAs(nameandcities,[name,city],true)].r247.push(r247);
    results[searchAofAs(nameandcities,[name,city],true)].respn.push(respn);
    results[searchAofAs(nameandcities,[name,city],true)].rrivals.push(rrivals);
  }
  else{
    nameandcities.push([name,city]);
    results.push(player);
  }
}
async function webScrape(results,nameandcities,dates,url){
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
  await driver.get(url);
  let data = [];
  for(let x=0;x<50;++x){
    //take all data
    let result;
    const xpath_stats = ["/html/body/div[1]/div[1]/section/main/section/section/ul/li[" + String(1+x) + "]/div[2]/div[","]/a/div[1]/div[2]/div/span[2]/span","/html/body/div/div[1]/section/main/section/section/ul/li[" + String(1+x) + "]/div[2]/div[","]/a/div[1]/div[2]/div/span[2]/span","/html/body/div[1]/div[1]/section/main/section/section/ul/li[" + String(1+x) + "]/div[2]/div[","]/a/div[3]/h6[1]","/html/body/div[1]/div[1]/section/main/section/section/ul/li[" + String(1+x) + "]/div[2]/div[","]/div/div[3]/h6[1]"];
    /*for(let y=0;y<3;++y){
      let nothappened=true;
      let a=0;
      while(nothappened){
        try{retrieveXpathData((xpath_stats[a]+String(y+1)+xpath_stats[a+1]),driver,By).then(function(txt){console.log(txt);nothappened=false;})}
        catch(error){a+=2;};
      }
    }*/
    const xpath_name = '/html/body/div[1]/div[1]/section/main/section/section/ul/li[' + String(1+x) + ']/div[1]/div[1]/div/a';
    /*const xpath_on3 = "/html/body/div[1]/div[1]/section/main/section/section/ul/li[" + String(1+x) + "]/div[2]/div[1]/a/div[1]/div[2]/div/span[2]/span";
    const xpath_247 = "/html/body/div[1]/div[1]/section/main/section/section/ul/li[" + str(1+x) + "]/div[2]/div[2]/a/div[1]/div[2]/div/span[2]/span";
    const xpath_espn = "/html/body/div[1]/div[1]/section/main/section/section/ul/li[" + str(1+x) + "]/div[2]/div[3]/a/div[1]/div[2]/div/span[2]/span";
    const xpath_rivals = "/html/body/div[1]/div[1]/section/main/section/section/ul/li[" + str(1+x) + "]/div[2]/div[4]/a/div[1]/div[2]/div/span[2]/span";*/
    const xpath_pos = "/html/body/div[1]/div[1]/section/main/section/section/ul/li["+ String(1+x) +"]/div[1]/div[1]/p[1]/span[1]";
    const xpath_citystate = "/html/body/div[1]/div[1]/section/main/section/section/ul/li["+ String(1+x) +"]/div[1]/div[1]/p[2]/span[2]";
    const xpath_committed = "/html/body/div[1]/div[1]/section/main/section/section/ul/li[" + String(1+x) + "]/div[3]/div/a";
    const xpaths = [xpath_name,xpath_pos,xpath_citystate,xpath_committed,(xpath_stats[0]+String(1)+xpath_stats[1])];
    retrieveXpathData(xpath_name,driver,By).then(async function(d) {await data.push(d);console.log(data);});
    //xpaths.map(let result;(function(xp){retrieveXpathData(xp,driver,By).then(function(txt) {let elm});}));
    //var elm = driver.findElement(By.xpath(xpath_name)).getText();
    //elm.getText().then(function(txt) {console.log(txt);});
    //elm=elm.getText();
    //let dat = retrieveXpathData(xpath_name,driver,By).then((x)=>{dat=x;});
    //console.log(await dat+"h");
  }
  console.log("DATA=="+data);
  /*driver.findElement(By.xpath('/html/body/div[1]/div[1]/section/main/section/section/ul/li[2]/div[1]/div[1]/div/a').then(function(element){
    element.getText().then(function(text){
        console.log(text);
    });
  }));*/
}
function retrieveXpathData(xpath,driver,By){return driver.findElement(By.xpath(xpath)).getText();}
async function addToData(data,xpath,driver,By){
  let result = await retrieveXpathData(xpath,driver,By).then(function(){});
}

let res = []
let nameandcities = []
addPlayer(1,1,1,1,"J","Q","Q","W",false,false,res,nameandcities);
console.log(res[0].print());
console.log(nameandcities);
addPlayer(1.1,1,1,1,"J","Q","Q","W",false,false,res,nameandcities);
console.log(res[0].print());
console.log(nameandcities);

webScrape(res,nameandcities,res,"https://www.on3.com/db/rankings/industry-comparison/football/2024/?page=1");
