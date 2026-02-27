// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let diameter = 80;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width /2; y = height/2;
  noFill();
  strokeWeight(3);
}

function draw() {
  background(220,20);
  x = lerp(x, mouseX, 0.1);
  y = lerp(y, mouseY, 0.1);
  //line(x,y,mouseX,mouseY);

  let r = map(x, 0, width, 0 ,255);
  let g = map(y,0,height,0,255);
  let b = 120
  stroke(r,g,b);
  //fill(r,g,b);
  circle(x,y,diameter);
}

function mouseWheel(event){
  //negative: scroll up: -100, -200, -300
  // positive: scroll down: 100, 200, 300

  if(event.delta<0){//up
    diameter += 5; 
  }
  else{
    diameter = max(5, diameter - 5);
  }
}