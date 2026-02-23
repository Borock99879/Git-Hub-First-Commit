// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let shapeState = 0;
// 0-circle 1-square 2-triangle 3-starburst
let starttime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  starttime = millis();
}

function draw() {
  background(220);
  drawShape();
  managetime();
}


//inspects shape State and draws shape
function drawShape(){
  let x = width/2;
  let y = height/2;
  switch(shapeState){
    case 0:
      circle(width/2, height/2, 150);
      break;
    case 1:
      square(width/2, height/2, 150);
      break;
    case 2:
      
      triangle(x-50, y+50, x+50, y+50, x, y-25);
      break;
    case 3:
      for(let i = 0; i < 30; i ++){
        let x2 = random(x-80, x+80);
        let y2 = random(y-80, y+80);
        line(x,y,x2,y2)
      }
      break;
  }
}

// resets timer
function managetime(){
  let time = millis() - starttime;
  if(time > 2000){
    updatestate();
    starttime = millis()
  }
}

function keyPressed(){
  updatestate();
}

function updatestate(){
  shapeState++;
  if (shapeState > 3) shapeState = 0;
}