// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let car;
let direction;
let eastbound = [];
let westbound = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  let c = color(random(255), random(255), random(255));
  let x = random(0,width); 
  let speed = random(1,20);
  let type = random(1,2)
  for (let i = 0; i < 20; i ++){ 
    eastbound.push(new Vehicle(type, x, random(height/2, height), c), 0, speed);
  }
  

  
  
}

function draw() {
  background(220);
  for (let i of eastbound){
    i.action();
  }
}



class Vehicle{
  constructor(type, x, y, color, direction, speed){
     this.type = type;  
     this.x = x; this.y = y;
     this.color = color;
     this.direction = direction; this.speed = speed
  }
  action(){
    this.speedup();
    this.speeddown();
    this.changecolor();
    this.display();
    this.move();
    
  }
  display(){
    fill(this.color);
    
    if (this.type > 1.5){
      circle(this.x,this.y, 20)
    }
    else {
      rect(this.x,this.y,60,20);
    }
  }
  move(){
    if (this.direction === 0){
      this.x += this.speed 
    }
    else{
      this.x -= this.speed 
    }
    
    if (this.x < 0){
      this.x = width;
    }
    else if(this.x > width){
      this.x = 0;
    }
  }
  speedup(){
    let can_speedup = random(1,100);
    if (can_speedup < 5){
      this.speed += 1;
    }
  }
  speeddown(){
    let can_speeddown = random(1,100);
    if(can_speeddown < 5){
      this.speed -= 1;            
    }
  }
  changecolor(){
    let can_changecolor = random(1,100);
    if(can_changecolor < 5){
      this.color = color(random(255), random(255), random(255));
    }
  }
}