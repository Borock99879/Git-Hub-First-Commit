// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let circlex = 175;

function setup() {
  createCanvas(500, 400);
}

// screen is updated at bottom of draw
function draw() {
  drawTwoCircles();
}                                   
 

function drawTwoCircles(){
  background(200, 10 , 20);
    //     x    y   diameter
  fill("blue");
  noStroke();
  circle(circlex, 100, 75);
  fill(0);
  stroke("#AAFFGG");
  circle(width/2, height/2, 250);
}
  
  
                           
