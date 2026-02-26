// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let diameter = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  xc = width/2; yc = height/2;
  xs = width/2; ys = height/2;
  xt = width/2; yt = height/2;
  noFill();
  
}

function draw() {
  background(220);

   xc = lerp(xc,mouseX,0.5);  yc = lerp(yc,mouseY,0.5);
   xs = lerp(xs,mouseX,0.1);  ys = lerp(ys,mouseY,0.1);
   xt = lerp(xt,mouseX,0.02);  yt = lerp(yt,mouseY,0.02);
  circle(xc,yc,diameter);
  square(xs,ys,diameter);
  triangle(xt,yt,yt,xt,width/2,height/2);
}

function mouseWheel(){
  if(event.delta<0){//up
    diameter += 5; 

  }
  else{
    diameter = max(5, diameter - 5);

  }
}