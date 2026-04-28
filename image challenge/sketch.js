//April 4, 2026
// Ben Sykes
// Image Manipulation Project





// sets up variables for images and a timer
let imagechip;
let imagerace;
let imagenuit;
let imagehand;
let time = 0;

function preload(){
  //loads images
  imagechip = loadImage("assets/chip.jpg");
  imagerace = loadImage("assets/race.jpg");
  imagenuit = loadImage("assets/nuit.jpg");
  imagehand = loadImage("assets/hand.jpg");
}


function setup() {
  createCanvas(imagechip.width, imagechip.height);
  pixelDensity(1);
}

function draw() {
  time ++;
  background(220);
  // displays image based on the timer
  if (time % 960 <= 240){
    image(imagechip,0,0);
  }
  else if (time % 960 <= 480){
    image(imagerace,0,0);
  }
  else if(time % 960 <= 720){
    image(imagenuit,0,0);
  }
  else{
    image(imagehand, 0, 0);
  }
  
  loadPixels();
  setpixels();
  updatePixels();
}


function setpixels(){
  for(let x = 0; x < width; x ++){
    for(let y = 0; y < height; y++){
      //does effect based on the timer
      if (time % 960 <= 240){
        majoritycolor(x,y);
      }
      else if (time % 960 <= 480){
        nogreen(x,y);
      }
      else if(time % 960 <= 720){
        average(x,y);
      }
      else{
        mirror(x,y);
      }
    }
  }
}




function majoritycolor(x,y){
let index = ((y*width) + x) * 4;
let r = pixels[index];
let g = pixels[index+1];
let b = pixels[index+2];
// detects which color is greatest
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
//handles a tie, makes the color green
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

  if(x < width/2){// tells which half of screen it is
    pixels[index] = r;
  pixels[index+1] = g;
  pixels[index+2] = b;
  }
  else{
    pixels[index] = r;
  pixels[index+1] = 0; // gets rid of green
  pixels[index+2] = b;
  }
}

function average(x,y){
  let index = ((y*width) + x) * 4;
  let r = pixels[index];
  let g = pixels[index+1];
  let b = pixels[index+2];
  // calculates average and changes color based on average
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
  //mirrors one half of screen
  if (x < width){
    let mirror  = ((y*width) + ( (width/2) * (1-x))) * 4 // uses the same process as index variable, but instead of x, it is the ofset of x
    pixels[mirror] = r;
    pixels[ mirror - 1] = g;
    pixels[mirror - 2] = b;

  }
}