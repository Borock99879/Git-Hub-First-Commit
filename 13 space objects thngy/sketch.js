

let myplanet;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  myplanet = new Planet (width/2, height/2);
}

function draw() {
  //background(220);
  myplanet.display();
}

function mousePressed(){
  if (keyIsPressed && keyCode === SHIFT){
    myplanet = new Planet(width/2, height/2)
  }
  else{
    for(let i = 0; i < 50; i ++){
      myplanet.createmoon();
    }
  }
  
  
}

function keyPressed(){
  if(keyCode !== SHIFT){
    myplanet.x = mouseX;
    myplanet.y = mouseY;
  }
}

class Planet{
  constructor(x,y){
    this.x = x; this.y = y; this.s = 100;
    this.moons = []
  }
  createmoon(){
    this.moons.push(new Moon());
  }
  display(){
    circle(this.x, this.y, this.s)
    for (let m of this.moons){
      m.update(this.x, this.y);
    }
  }
}

class Moon{
  constructor(){
    this.speed = random(1,3);
    this.angle = 0;
    this.orbitradius = random(100,200);
    this.s = random(10,50);
  }
  move(){
    this.angle += this.speed;
    
  }
  display(x,y){
    push();
    translate(x,y);
    rotate(this.angle);
    fill(random(255), random(255), random(255))
    circle(this.orbitradius, 0 ,this.s);
    pop();
  }

  update(x,y){
    this.move();
    this.display(x,y);
  }
}