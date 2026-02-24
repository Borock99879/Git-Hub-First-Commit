// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cx = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  gradient()
  movingball();
  circleline(height*0.35, 30);
  circleline(height/2, 50);
  circleline(height*0.65, 80);
  
}

function movingball(){
  cx += 15;
  if(cx > width){
    cx = 0;
  }
  circle(cx,50,25);
}

function circleline(y,size){
  let xstart = width * 0.1;
  let xend = width *0.9;

  for( let x = xstart; x < xend; x += size){
    circle(x,y,size)
  }
}

function gradient(){
  let h = 1;
  let y = 0;
  while (y < height){
    noStroke();
    let value = map(y,0,height,0,255);
    fill(value, 0, 0);
    rect(0,y,width,h);
    y += h;
  }
}