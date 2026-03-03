

let x = 0; let w = 1;
let y = 0; let h = 0;
let min = 0, max = 0;
let noisetime = 0, noisespeed = 0.009;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(220);
  drawterrain();
}


function drawterrain(){
  fill("black");
  h = height;
  max = height;
  for (let x = 0; x < width; x += w ){
  y = noise(noisetime);
  y = map(y, 0, 1, min, max);
  rect(x,y,w,h);

  noisetime += noisespeed;
  }
  
}

function keyPressed(){
  console.log(keyCode);
  if (keyCode === 37){ // left arrow
    if (w > 2){
      w += -1;
    }
    
  }
  else if (keyCode == 39){ // right arrow
    if (w < 60){
      w += 1;
    }
  }
  
}