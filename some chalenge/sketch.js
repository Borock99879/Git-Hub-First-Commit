// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x = 0;
let y = 0;
let dir = 0;// 0 = right, 1 = down, 2 = left, 3 = up

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  
  background(220);
  if ( dir === 0){
    if (x < width - 20){
      dir = 1
    }
  }
  
  square(x,y,30);
}

