let imagechip;
let imagerace;
let imagenuit;

function preload(){
  imagechip = loadImage("assets/chip.jpg");
  imagerace = loadImage("assets/race.jpg");
  imagenuit = loadImage("assets/nuit.jpg");
}


function setup() {
  createCanvas(imagechip.width, imagechip.height);
  pixelDensity(1);
}

function draw() {
  background(220);
  image(imagechip,0,0);
  // image(imagerace,0,0);
  //image(imagenuit,0,0);
  loadPixels();
  setpixels();
  updatePixels();
}


function setpixels(){
  for(let x = 0; x < width; x ++){
    for(let y = 0; y < height; y++){
      //majoritycolor(x,y);
      //nogreen(x,y);
      //average(x,y);
      mirror(x,y);
    }
  }
}




function majoritycolor(x,y){
let index = ((y*width) + x) * 4;
let r = pixels[index];
let g = pixels[index+1];
let b = pixels[index+2];
if(r > g && r > b){
  pixels[index] = 255;
  pixels[index+1] = 0;
  pixels[index+2] = 0;
}
if(g > r && g > b){
  pixels[index] = 0;
  pixels[index+1] = 255;
  pixels[index+2] = 0;
}
if(b > g && b > r){
  pixels[index] = 0;
  pixels[index+1] = 0;
  pixels[index+2] = 255;
}
if(r === g || g === b){
  pixels[index] = 0;
  pixels[index+1] = 255;
  pixels[index+2] = 0;
}
}

function nogreen(x,y){
  let index = ((y*width) + x) * 4;
  let r = pixels[index];
  let g = pixels[index+1];
  let b = pixels[index+2];
  if(x < width/2){
    pixels[index] = r;
  pixels[index+1] = g;
  pixels[index+2] = b;
  }
  else{
    pixels[index] = r;
  pixels[index+1] = 0;
  pixels[index+2] = b;
  }
}

function average(x,y){
  let index = ((y*width) + x) * 4;
  let r = pixels[index];
  let g = pixels[index+1];
  let b = pixels[index+2];
  let avg = (r+b+g)/3;
  if(avg >= 205){
    pixels[index] = 170;
  pixels[index+1] = 230;
  pixels[index+2] = 220;
  }
  else if(avg >= 155){
    pixels[index] = 105;
  pixels[index+1] = 170;
  pixels[index+2] = 180;
  }
  else if(avg >= 105){
    pixels[index] = 120;
  pixels[index+1] = 180;
  pixels[index+2] = 60;
  }
  else if(avg >= 55){
    pixels[index] = 130;
  pixels[index+1] = 30;
  pixels[index+2] = 130;
  }
  else{
    pixels[index] = 40;
  pixels[index+1] = 40;
  pixels[index+2] = 80;
  }
}

function mirror(x,y){
  let index = ((y*width) + x) * 4;
  let r = pixels[index];
  let g = pixels[index+1];
  let b = pixels[index+2];
  if (x < width){
  pixels[(width/2) - x * (width/2)] = r;
  pixels[(width/2) - x  *(width/2) ] = g;
  pixels[(width/2) - x  *(width/2)] = b;
  }
}