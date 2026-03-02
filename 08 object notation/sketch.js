// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let ball;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = { // object notation. Inside the bracketsset up a bunch of propert : value pairs
    x: 300, y: 400, size: 20, c: color(random(255), random(255), random(255)), timex: random(100), timey: random(100), timeoff: 0.08
  }
  ball2 = { // object notation. Inside the bracketsset up a bunch of propert : value pairs
    x: 400, y: 300, size: 30, c: color(random(255), random(255), random(255)), timex: random(100), timey: random(100), timeoff: 0.06
  }
}

function draw() {
 
  moveball(ball);
  moveball(ball2);
}

function moveball(b){
  let dx = noise(b.timex);
  dx = map(dx, 0, 1, -5, 5);
  let dy = noise(b.timey);
  dy = map(dy, 0, 1, -5, 5);
  
  b.timex += b.timeoff; b.timey += b.timeoff;

  b.x += dx; b.y += dy;

  if(b.x < 0) 
    b.x = width;
    else if (b.x > width)
      b.x = 0;
    
    if(b.y < 0) 
      b.y = height;
      else if (b.y > height)
        b.y = 0;
      

  fill(b.c);
  circle(b.x, b.y, b.size);
}