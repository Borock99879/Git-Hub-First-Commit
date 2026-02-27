// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let d1, d2;
let min = 5; let max = 200;
let x1, x2, y1, y2;

let noisetime = 5, noisespeed = 0.01;
//speed controls how connected noise values are

function setup() {
  createCanvas(windowWidth, windowHeight);
  x1 = width * 0.3; y1 = height/2; 
  x2 = width * 0.7; y2 = height/2;
  
}

function draw() {
  background(0);
  //randomSeed(764);
  //stars();
  randomcircles();
  noisecircle();
}


function stars(){
  fill(255);
  for(let i = 0; i < 100; i ++){
    let x = random(0,width);
    let y = random(onabort,height);
    circle(x,y,3);
  }
}

function randomcircles(){
  fill(120,180,60);
  d1 = random(min, max);
  d2 = random(min, max);
  circle(x1, y1, d1);
}

function noisecircle(){
fill(200,150,50);
d2 = noise(noisetime);
d2 = map(d2, 0 , 1, min, max);
circle(x2, y2, d2);
noisetime += noisespeed;
}