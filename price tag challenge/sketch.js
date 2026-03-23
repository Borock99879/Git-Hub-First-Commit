let items 
let startx, starty
let speedy 
let baseprice 
let name
let province = new Map()
let currprov = "SK"

function setup() {
  createCanvas(windowWidth, windowHeight);
   startx = random(0,width);  starty = random(0,height);
   items = [];
   
   speedy = random(1,3)
   baseprice = random(10,100);
   
   
   
  for(let i = 0; i < 20; i ++){
    items.push( i);
  }
    province.set("SK", {tax: 1.11});
    province.set("AB", {tax: 1.05});
    province.set("ON", {tax: 1.13});
  }
  

function draw() {
  background(220);
  let rules = province.get(currprov)
  for(let i = 0; i < items.length; i ++){
    items[i].starty += items[i].speedY;
    rect(items[i].startx, items[i].starty, 60, 40);
    text(items[i].basePrice * rules.tax)
    
    
  }
 
}


function keyPressed(){

}
