// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x = 0;
let y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(220);
  challenge()
}

function challenge(){
  stroke("black")
  for(let cx = x; x < width;){
    line(cx,y, mouseX, MouseY);
    cx += 15;
  }
  for(let cy = y; y < height;){
    line(x, cy, mouseX, MouseY);
    cy += -15;
  }
  for(let ex = x; x > 0;){
    line(ex,y, mouseX, MouseY);
    ex += -15;
  }
  for(let ey = y; y > 0;){
    line(x, ey, mouseX, MouseY);
    ey += 15;
  }
  
}