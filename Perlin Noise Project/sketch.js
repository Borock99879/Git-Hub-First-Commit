

let x = 0; let w = 1;
let y = 0; let h = 0;
let min = 0, max = 0;
let noisetime = 0, noisespeed = 0.009;
let move = 0;
let heightestx = 0;
let heightesty = 0;
let averagey = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  noisetime = move;
  background(220);
  drawterrain();
  drawFlag(heightestx, heightesty);
}


function drawterrain(){
  averagey = [];
  heightesty = height;
  fill("black");
  h = height;
  max = height;
  for (let x = 0; x < width; x += w  ){
  y = noise(noisetime);
  y = map(y, 0, 1, min, max);
  rect(x,y,w,h);

  noisetime += noisespeed;
  move += 0.00001

  averagey.push(y);
  let sum = 0;
  for (let i = 0; i < averagey.length; i += 1){
    sum += averagey[i];
    
  }
  sum = sum / averagey.length;
  console.log(sum)

  if (y < heightesty){
    heightesty = y;
    heightestx = x;
  }
  }
  
  
}

function keyPressed(){
  console.log(keyCode);
  if (keyCode === 37){ // left arrow
    if (w > 1){
      w += -1;
    }
    
  }
  else if (keyCode === 39){ // right arrow
    if (w < 10){
      w += 1;
    }
  }
  
}

function drawFlag(x,y){
  fill("#F54927")
  line(x,y,x,y-20);
  triangle(x,y-20,x,y-30,x+10,y-25)
}
