

let mybook;                              





function setup() {
  createCanvas(windowWidth, windowHeight);
  mybook = new Book("CS30 Text", "Mr. Scott", 1234567891011, "leatherbound", 500 , width*0.3);
}

function draw() {
  background(220);
  mybook.display();
}

class Book{
  //1. Constructor
  constructor(title,author,isbn,cover,pages,x){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.cover = cover;
    this.pages = pages;
    this.x = x;
  }
  //2. methods

  display(){
    rectMode(CENTER); textAlign(CENTER,CENTER);
    textSize(20);
    switch(this.cover){
      case "softcover":
        fill("blue"); break;
      case "hardcover":
        fill("red"); break;
      case "leatherbound":
        fill("green"); break;
    }
    push();
    translate(this.x, height/2);
    rect(0, 0, this.pages/10, 150);
    fill(0);
    text(this.title[0], 0, -50 )
    pop();
  }
}
