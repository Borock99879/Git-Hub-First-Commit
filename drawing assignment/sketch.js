// Scene challenge
// Ben Sykes
// 2/11/2026





function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  let horz_line = 3*windowHeight/4;
  background("blue");
  
  fill("yellow");//sun
  circle(40,50,200);

  fill("#25FDFD");//mountains/ground
  rect(0, horz_line,windowWidth, horz_line);
  triangle(0, horz_line, windowWidth/8, windowHeight/3, windowWidth/4, horz_line);
  triangle(windowWidth/4, horz_line, 3*windowWidth/8, windowHeight/4, windowWidth/2, horz_line);
  triangle(windowWidth/2, horz_line, 5*windowWidth/8, windowHeight/2, 3*windowWidth/4, horz_line);
  triangle(3*windowWidth/4, horz_line, 7*windowWidth/8, windowHeight/5, windowWidth, horz_line);


  
  console.log(keyCode)
  penguin();
}

function penguin(){
let px = windowWidth/2
let py = windowHeight*3/4
fill("black")
circle(px, py*5/6, 40)
circle(px, py*17/19, 60)
}