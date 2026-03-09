let size = 30;
let bubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  populatearray();
}

function draw() {
  background(220);
  drawbubbles();

}




function populatearray(){
  for (let x = 0; x <= width; x +=  size){
    for (let y = 0; y <= height; y += size ){
      let b = {x:x, y:y}
      bubbles.push(b);
      
    }
  }
}

function drawbubbles(){
  for(let i = 0; bubbles.length; i ++){
    let b = bubbles[i];
    circle(b.x, b.y, size );
    textAlign(CENTER, CENTER);
    let d = dist(b.x, b.y, mouseX, mouseY);
    text(d, b.x, b.y);
    if(d < size/2){
      bubbles.splice(i,1);
    }
  }
}

function dist(x1,y1,x2,y2){
  let a = x1-x2; let b = y1-y2;
  let c = sqrt(pow(a,2) + pow(b,2));
  return round(c)
}