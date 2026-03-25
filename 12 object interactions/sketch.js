// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let nodes = [];
let reach = 150;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for(let n of nodes){
    n.move();
    n.connect(nodes);
    n.display();
  }
}

function mousePressed(){
  if (mouseButton === "center"){
    nodes.push(new CSnode(mouseX, mouseY));
  }
  if( mouseButton === "left"){
    for (let i = 0; i < 200; i ++){
      let x = random(-500,500);
      let y = random(-500,500)
      nodes.push(new CSnode(mouseX + x, mouseY+y));
    }
  }
}




class CSnode{
  constructor(x,y){
    this.x = x; this.y = y, this.size = 0.5;
    this.c = color(random(255), random(255), random(255));
    this.xtime = random(100); this.ytime = random(100);
    this.timeshift = 0.01; this.maxspeed = 3;
  }
  display(){
    fill(this.c);
    noStroke();
    circle(this.x,this.y,this.size)
  }
  move(){
    let xspeed = noise(this.xtime);
    xspeed = map(xspeed, 0, 1, -this.maxspeed, this.maxspeed);
    this.xtime += this.timeshift;
    this.x += xspeed;
    if (this.x < 0){
      this.x = width;
    }
    else if (this.x > width){
      this.x = 0;
    }
    let yspeed = noise(this.ytime);
    yspeed = map(yspeed, 0, 1, -this.maxspeed, this.maxspeed);
    this.ytime += this.timeshift;
    this.y += yspeed;
    if (this.y < 0){
      this.y = height;
    }
    else if (this.y > height){
      this.y = 0;
    }
  }
  connect(nodeArray){
    stroke(this.c);
    for(let n of nodeArray){
      if( n !== this){
        let d = dist(this.x, this. y, n.x, n.y);
        if (d < reach){
          line(this.x, this.y, n.x, n.y);
        }
      }
    }
  }
}