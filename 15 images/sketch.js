// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let lionL, lionR;
let pinImages = [];
let current = 0;

async function loadAssets(){
  lionL = loadImage("assets/lion-left.png")
  lionR = loadImage("assets/lion-right.png")
  for( let i = 0; i <= 8; i++){
    pinImages.push(loadImage("assets/pin-0"+i+".png"));
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  loadAssets();
  imageMode(CENTER);
  noCursor();
}

function draw() {
  background(220);
  if (movedX < 0){
    image(lionL, mouseX, mouseY, lionL.width*8, lionL.height/5);
  }
  else if (movedX > 0){
    image(lionR, mouseX, mouseY, lionR.height/8, lionR.height*2);
  }
  pinwheel();
}

function pinwheel(){
  current ++ 
  if (current > 8){
    current = 0
  }
    
    image(pinImages[current], width/2, height/2)

}