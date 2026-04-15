// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//grid is 5 x 5

let grid = [
  [255,255,0,0,0],
  [0,255,255,0,0],
  [0,0,255,0,0],
  [0,0,0,255,0],
  [0,0,0,0,255]
]
let rows = grid.length;
let cols = grid[0].length;
let size = 60;

function setup() {
  createCanvas(cols*size, rows*size);
}

function draw() {
  background(220);
  rendergrid();
  textSize(30);
  fill(255,0,0)
  text(currx()+","+ curry(), mouseX,mouseY)
}

function rendergrid(){
  for(let y = 0; y < rows; y ++){
    for( let x = 0; x < cols; x++){
      let c = grid[y][x];
      fill(c)
      square(x*size,y*size,size)
    }
  }
}

function currx(){
  let constrainx = constrain(mouseX, 0 , width-1);
  return floor(constrainx/size);
}

function curry(){
  let constrainy = constrain(mouseY, 0 , height-1);
  return floor(constrainy/size);
}

function flip(x,y){
  if (grid[y][x] === 0){
    grid[y][x] = 255
  }
  else{
    grid[y][x] = 0;
  }
}
function mousePressed(){
  flip(currx(),curry())
}