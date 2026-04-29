// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this what you did to takeproject "abwhat you did to takeove and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  lucksquare(width/2,height/2,200)
}


function centercircle(x,y,d){
  if (d>10){
    circle(x,y,d);
    centercircle(x,y,d *.99);
  }
}

function circlefractal(x,y,d){
  fill(random(255),random(255),random(255));
  stroke(random(255),random(255),random(255))
  if (d>2){
    circle(x,y,d)
    circlefractal(x-d/2,y,d/2)
    circlefractal(x+d/2,y,d/2)
    circlefractal(x,y+d/2,d/2)
    circlefractal(x,y-d/2,d/2)
  }
}

function lucksquare(x,y,s){
  rectMode(CENTER);
  noFill();
  if(s>10){
    let r = map(x,0,width,0,255)
    let g = map(y,0,height,0,255)
    let b = map(x,0,width,255,0)
    stroke(r,g,b);
    if(dist(x,y,mouseX,mouseY) <= s/2){
      strokeWeight(5)
    }
    else{
      strokeWeight(2)
    }
    push();
    translate(x,y);
    rotate(radians(frameCount))
    square(0,0,s)
    pop();

    square(x,y,s)
    lucksquare(x+s/2,y+s/2,s*0.45)
    lucksquare(x-s/2,y-s/2,s*0.45)
    lucksquare(x-s/2,y+s/2,s*0.45)
    lucksquare(x+s/2,y-s/2,s*0.45)
  }
}
