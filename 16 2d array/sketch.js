// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//grid is 5 x 5

let grid = []
let rows
let cols 
let size 
let mode = 2 // defaults mode. mode 1 = 1 tile. 2 = cross. 3 = square


function setup() {
  randomize();//randomizes and sets up the rows and cols variables
  rows = grid.length;
  cols = grid[0].length;
  size = 100;
  createCanvas(cols*size, rows*size);
  
}

function draw() {
  background(220);
  rendergrid();
  overlay();
  win();
}

function rendergrid(){//sets up the grid
  for(let y = 0; y < rows; y ++){
    for( let x = 0; x < cols; x++){
      let c = grid[y][x];
      fill(c)
      square(x*size,y*size,size)
    }
  }
}

function currx(){ // constrains clicking for within the boxes
  let constrainx = constrain(mouseX, 0 , width-1);
  return floor(constrainx/size);
}

function curry(){
  let constrainy = constrain(mouseY, 0 , height-1);
  return floor(constrainy/size);
}

function flip(x,y){ // changes the value of the box
  if (grid[y][x] === 0){
    grid[y][x] = 255
  }
  else{
    grid[y][x] = 0;
  }
}

function mousePressed(){
  if( mouseX < width && mouseY < height){ // changes squares based on the mode
    let x = currx();
    let y = curry();
    if(mode === 1){
      flip(x,y);
    }
    
    else if (mode === 2){
      flip(x,y);
      if(x-1>=0){
        flip(x-1,y);
      }
      if(y-1 >= 0){
        flip(x,y-1);
    }
    if(x+1 <= width){
      flip(x+1,y);
  }
  if(y+1 <= height){
    flip(x,y+1);
} 
  }
  else{
    flip(x,y);
    if(x-1>=0){
      flip(x-1,y)
      if(y-1<=height){
        flip(x-1,y+1)
      }
    }
    if(y-1 <= height){
      flip(x,y+1)
    }
  }
}
}

function randomize(){ // randomizes the grid set up by setting up random grid values
  grid =  [
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0]]
  for(let x = 0; x < grid.length; x ++){
    for(let y = 0; y < grid[0].length; y++){
      let r = random(1,2);
      if (r <= 1.5){
        flip(x,y)
      }
    }
  }
}

function win(){ // calculates a win by adding up all the points. If all the points are = to 0 or 255 * grid slots, then win is true and it diplays it
  let points = 0
  for(let x = 0; x < grid.length; x++){
    for(let y = 0; y < grid[0].length; y++){
      if(grid[x][y] === 255){
        points += grid[x][y];
      }
    }
  }
  if(points === rows * cols * 255 || points === 0){
    textAlign(CENTER);
    fill(255,0,0);
    textSize(30);
    text("YOU WIN!", width/2, height/2)
  }
}

function overlay(){ // based on the mode, it creates an overlay
  fill(146,240,177,150);
  let x = currx();
  let y = curry()
  if (mode === 1){
    square(x*size,y*size,size);
  }
  else if (mode === 2){
  square(x*size,y*size,size);
  square((x+1)*size,y*size,size);
  square((x-1)*size,y*size,size);
  square(x*size,(y+1)*size,size);
  square(x*size,(y-1)*size,size);
  }  
  else{
  square(x*size,y*size,size);
  square((x-1)*size,y*size,size);
  square((x-1)*size,(y+1)*size,size);
  square(x*size,(y+1)*size,size);
  }
}

function changemode(){// changes the mode based on the key pressed. I have shift key pressed instead of held because it makes the game flow better
  if(keyIsDown(16)){//shift
    if(mode !== 1){
      mode = 1
    }
    else{
      mode = 2
    }
    
  }


  if (keyIsDown(32)){//space
    if (mode === 2){
       mode = 3
    }
    else {
       mode = 2
      }
    }
  }  

  function keyPressed(){//senses if a key is pressed in order to change the mode
    changemode()
  }
 
 