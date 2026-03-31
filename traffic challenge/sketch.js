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
let green = true;
let timer = 0
let new_time;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (let i = 0; i < 20; i ++){ 
    eastbound.push(new Vehicle(random(1,2), random(0,width) , random(height/2+20, 3*height/4), color(random(255), random(255), random(255)), 0, random(1,20)));
  }
  for (let i = 0; i < 20; i ++){ 
    westbound.push(new Vehicle(random(1,2), random(0,width) , random(height/4, height/2-80), color(random(255), random(255), random(255)), 1, random(1,20)));
  }

  
  
}

function draw() {
  timer ++;
  background(220);
  draw_road();
  for(let i of eastbound){
    i.action();
  }
   for(let i of westbound){
     i.action();
   }
   if(green === false){
      if(timer - new_time >= 120){
        green = true;
      }
   }
   if (green){
    fill("green")
   }
   else {
    fill("red")
   }
   circle(50,50,50);
}



class Vehicle{
  constructor(type, x, y, color, direction, speed){
     this.type = type;  
     this.x = x; this.y = y;
     this.color = color;
     this.direction = direction; this.speed = speed
  }
  action(){
    this.display();
    if(green){
      this.move();
      this.speedup();
    this.speeddown();
    this.changecolor();
    }
    
    
    
    
    
    
  }
  display(){
    
    
    if (this.type > 1.5){
      fill(255)
      circle(this.x,this.y+10,10)
      circle(this.x,this.y+50,10)
      circle(this.x+20,this.y+50,10)
      circle(this.x+20,this.y+10,10)
      fill(this.color)
      rect(this.x,this.y,20,60);
    }
    else {
      fill(255)
      circle(this.x+10,this.y,10)
      circle(this.x+50,this.y,10)
      circle(this.x+50,this.y+20,10)
      circle(this.x+10,this.y+20,10)
      fill(this.color)
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
      this.speed += 0.5;
    }
  }
  speeddown(){
    let can_speeddown = random(1,100);
    if(can_speeddown < 5){
      this.speed -= 0.5;            
    }
  }
  changecolor(){
    let can_changecolor = random(1,100);
    if(can_changecolor < 5){
      this.color = color(random(255), random(255), random(255));
    }
  }
}

function draw_road(){
  fill(0);
  rect(0,height/4 - 40, width, height/2 + 100);
  fill("yellow");
  for(let i = 0; i < width; i += 40){
    rect(i,height/2,20,5);
  }
  
}

function mousePressed(){
  if (mouseButton === LEFT){
    eastbound.push(new Vehicle(random(1,2), random(0,width) , random(height/2+20, 3*height/4), color(random(255), random(255), random(255)), 0, random(1,20)));
  }
  if (mouseButton === CENTER){
    westbound.push(new Vehicle(random(1,2), random(0,width) , random(height/4, height/2-80), color(random(255), random(255), random(255)), 1, random(1,20)));
  }
}

function keyPressed(){
  if(keyCode === 32){
    if(green){
      green = false;
      new_time = timer;
    }
  }
}