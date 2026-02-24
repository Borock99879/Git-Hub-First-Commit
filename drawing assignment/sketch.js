// Scene challenge
// Ben Sykes
// 2/11/2026

//position
let px;  
let py; 

let is_night = false;

let currentBack = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  px = windowWidth/2;
  py = windowHeight*3/4;
  
}

function draw() {
  
  //handles background and sun change
  if (is_night){
    background("black");
    fill("white");
  }
  else {
    background("blue");
    fill("yellow");
  }

  
  

 
  //sun
  circle(mouseX,mouseY,200);

  drawMountain();
 
  
  


  
  console.log(keyCode)
  
  penguin();
}

function penguin(){ //makes the penguin and handles movement
noStroke();
fill("black");
circle(px, py*5/6, 40);
circle(px, py*17/19, 60);

fill("white");
circle(px, py*5/6, 25);
circle(px, py*17/19, 45 );
fill("black");
circle(px-6, py*5/6, 5);
circle(px+6, py*5/6, 5);
fill("#CD733D");
rect(px+8, py-50, 20, 10);
rect(px-24, py-50, 20, 10);


//handles movement
 if (keyIsDown(65)){//a
  if (px >= 0 && px <= windowWidth){
    px += -5;
  }
  else if (px <= 0 ){
    px += 10;
   }else  {
      px += -10;
    }
  
 }
   else if (keyIsDown(68)){//d
    if (px >= 0 && px <= windowWidth){
      px += 5;
    }
    else if (px <= 0 ){
      px += 10;
     }else  {
        px += -10;
      }
  }
  
  textSize(50)
  text("Ben Sykes", 0,windowHeight-10);
}


function keyPressed(){ //changes background if space key is pressed
  if ( keyCode === 32){
    if (is_night){
      is_night = false 
    }   
    else {
      is_night = true
    } 
  }
  //handles color change of mountains
  else if(keyCode === 49){ //1
    currentBack = 0;
  }
  else if(keyCode === 50){ //2 
    currentBack = 1;
  }
  else if(keyCode === 51 ){// 3
    currentBack = 2;
  }
  else if(keyCode === 52){// 4
    currentBack = 3;
  }
}  

// draws mountains and gorund
function drawMountain(){// changes color
  let horz_line = 3*windowHeight/4;
  if (currentBack === 0){
    fill("#25FDFD");
  }
  else if (currentBack === 1){
    fill("red");
  }
  else if (currentBack === 2){
    fill("green");
  }
  else if (currentBack === 3){
    fill("yellow");
  }
  
  //mountains and ground
  triangle(0, horz_line, windowWidth/8, windowHeight/3, windowWidth/4, horz_line);
  triangle(windowWidth/4, horz_line, 3*windowWidth/8, windowHeight/4, windowWidth/2, horz_line);
  triangle(windowWidth/2, horz_line, 5*windowWidth/8, windowHeight/2, 3*windowWidth/4, horz_line);
  triangle(3*windowWidth/4, horz_line, 7*windowWidth/8, windowHeight/5, windowWidth, horz_line);
  rect(0, horz_line-50,windowWidth, horz_line);
}