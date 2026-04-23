// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let image1;
let c;

function preload(){
  image1 = loadImage("assets/aviator.png")
}

function setup() {
  createCanvas(640,480);
  myvid = createCapture(VIDEO);
  pixelDensity(1);
  c = color(random(255),random(255),random(255), random(255))
}

function draw() {
  background(220);
  image(myvid,0,0)
  loadPixels();
  //boost();
  //grey();
  loadPixels();
  background(0);
  txt();
}

function boost(){
  let bamm = map(mouseX,onabort,width, -100,100);
  for (let i = 0; i < pixels.length; i += 4){
    let r = pixels[i] + bamm;
    let g = pixels[i+1] + bamm;
    let b = pixels[i+2] + bamm;
    setpixel(i,r,g,b);
  }
}

function getavg(x,y){
  let index = ((y*width) + x) * 4
  let r = pixels[index];
  let g = pixels[index+1];
  let b = pixels[index+2];
  return((r+b+g)/3)
}

function grey(){
  for(let x = 0; x < width; x ++){
    for(let y = 0; y < height; y++){
      let avg = getavg(x,y);
      setpix(x,y,avg,avg,avg);
    }
  }
}

function setpix(x,y,r,g,b){
  let index = ((y*width) + x) * 4;
  setpixel(index,r,g,b);
}

function setpixel(pos, r, g, b){
  pixels[pos] = r;
  pixels[pos+1 ] = g;
  pixels[pos + 2] = b;
}

function txt(){
  fill(c)
;
let scaleam = 3;
textSize = scaleam;
for(let x = 0; x < width; x += scaleam){
  for(let y = 0; y <height; y += scaleam){
    let avg = getavg(x,y);
    if(avg > 210){
      text("&", x, y)
    }
    else if(avg > 170){
      text("T", x, y)
    }
    else if(avg > 130){
      text("x", x, y)
    }
    else if(avg > 90){
      text(":", x, y)
    }
    else if(avg > 45){
      text(".", x, y)
    }
  }
}
}