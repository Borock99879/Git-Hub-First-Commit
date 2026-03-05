//terrain generation
//Ben Sykes
//3/5/2026






let x = 0; let w = 1;//declares variables for the rectangle values
let y = 0; let h = 0;

let min = 0, max = 0;// sets up values for mapping

let noisetime = 0, noisespeed = 0.009;//handles noise and movement
let move = 0;

let heightestx = 0;// locates the highest position to draw the flag
let heightesty = 0;

let averagey = [];// sets up an array and variable to calculate height average
let sum = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  noisetime = move;//updates the noise timeline to add movement
  background("#78D6FF");
  drawterrain();
  drawFlag(heightestx, heightesty);
  fill("red");// draws the average line
  rect(0,sum,width,5);
}


function drawterrain(){
  averagey = [];// resets the array that calculates average each frame
  heightesty = height;// sets the heighest point to the botttom as default so any point can be the heighest

  fill("black");//draws all the rectangles
  h = height;
  max = height;
  for (let x = 0; x < width; x += w  ){
  y = noise(noisetime);//updates noise to add smoothness
  y = map(y, 0, 1, min, max);
  rect(x,y,w,h);

  noisetime += noisespeed;
  move += 0.00001// moves the rectangles left by moving the noise timeline

  averagey.push(y);// calculates average by adding items to an array, summing it all up and dividing it by the amount of items
  sum = 0;//resets the sum so it doesnt mess up future sums
  for (let i = 0; i < averagey.length; i += 1){
    sum += averagey[i];// adds items to the array
    
  }
  sum = sum / averagey.length;// divides the sum by amount of items in array
  

  if (y < heightesty){//resets the heighest point if a heigher point is located
    heightesty = y;
    heightestx = x; // locates the x value of the heighest point
  }
  }
  
  
}

function keyPressed(){ // handles increasing the width of the rectangles
  console.log(keyCode);
  if (keyCode === 37){ // left arrow
    if (w > 1){
      w += -1;
    }
    
  }
  else if (keyCode === 39){ // right arrow
    if (w < width){
      w += 1;
    }
  }
  
}

function drawFlag(x,y){//draws the flag at the heighest point
  fill("#F54927")
  line(x,y,x,y-20);
  triangle(x,y-20,x,y-30,x+10,y-25)
}
