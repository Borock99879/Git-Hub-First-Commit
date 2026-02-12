// Scene challenge
// Ben Sykes
// 2/11/2026


let px;  
let py; 
let is_night = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  px = windowWidth/2;
  py = windowHeight*3/4;
}

function draw() {
  let horz_line = 3*windowHeight/4;
  if (is_night){
    background("black");
    fill("white");
  }
  else {
    background("blue");
    fill("yellow");
  }

  
  

 
  
  circle(mouseX,mouseY,200);

  fill("#25FDFD");//mountains/ground
  
  triangle(0, horz_line, windowWidth/8, windowHeight/3, windowWidth/4, horz_line);
  triangle(windowWidth/4, horz_line, 3*windowWidth/8, windowHeight/4, windowWidth/2, horz_line);
  triangle(windowWidth/2, horz_line, 5*windowWidth/8, windowHeight/2, 3*windowWidth/4, horz_line);
  triangle(3*windowWidth/4, horz_line, 7*windowWidth/8, windowHeight/5, windowWidth, horz_line);
 
  
  


  rect(0, horz_line-50,windowWidth, horz_line);
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
  
   
  
}


function keyPressed(){
  if ( keyCode === 32){
    if (is_night){
      is_night = false 
    }   
    else {
      is_night = true
    } 
  }
}  