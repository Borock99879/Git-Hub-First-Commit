// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let textShade = 255 ;
let textScale = 40;
let bgcolor = "grey";

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(bgcolor);
  //displaymouse();
  displaykeyboard();
}

function mousePressed(){
 
  textScale = int(random(10,100));
  textShade = int(random(0,255));
}

function displaykeyboard(){
  if(key === " "){
    bgcolor = color(random(255), random(255), random(255))
  }
  textSize(30);
  textAlign(CENTER, CENTER);
  let t = keyIsPressed + ", " + key + ", " + keyCode;
  text(t, width/2, height/2);
}

// function displaymouse(){


// textSize(textScale);
// fill(textShade);
// text(mouseX + ", " + mouseY + ", " + mouseIsPressed + ", " + mouseButton, mouseX, mouseY);
// }