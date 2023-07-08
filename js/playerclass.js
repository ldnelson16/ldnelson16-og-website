//String formatter function
String.prototype.format = function () {
  var args = arguments;
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] == 'undefined' ? match : args[index];
  });
};

export class Player {
  constructor(ratingon3,rating247,ratingespn,ratingrivals,name,position,city,state,committed,team = false) {
    this.name=name;
    this.ron3=[isNaN(ratingon3) ? ratingon3 : parseInt(ratingon3)];
    this.r247=[isNaN(rating247) ? rating247 : parseInt(rating247)];
    this.respn=[isNaN(ratingespn) ? ratingespn : parseInt(ratingespn)];
    this.rrivals=[isNaN(ratingrivals) ? ratingrivals : parseFloat(ratingrivals)];
    this.pos=position;
    this.city=city;
    this.state=state;
    this.committed=committed;
    this.team=team;
  }
  print() {
    let f1="{0}: Ratings - On3:{1}, 247:{2}, ESPN:{3}, Rivals:{4}\nPos: {5}, City: {6}, State: {7}\n{8} commit";
    let f2="{0}: Ratings - On3:{1}, 247:{2}, ESPN:{3}, Rivals:{4}\nPos: {5}, City: {6}, State: {7}";
    return this.committed===true?f1.format(this.name,this.ron3,this.r247,this.respn,this.rrivals,this.pos,this.city,this.state,this.team):f2.format(this.name,this.ron3,this.r247,this.respn,this.rrivals,this.pos,this.city,this.state);
  }
}