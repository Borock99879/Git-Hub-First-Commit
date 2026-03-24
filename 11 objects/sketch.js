

let mybook;                              





function setup() {
  createCanvas(windowWidth, windowHeight);
  mybook = new Book("CS30 Text", "Mr. Scott", 1234567891011, "leatherbound", 500 , width*0.3);
}

function draw() {
  
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
    switch(this.author.cover){
      case "softcover":
        fill(random(255),random(255), random(255)); break;
      case "hardcover":
        fill(random(255),random(255), random(255)); break;
        case "leatherbound":
          fill(random(255),random(255), random(255)); break;
    }
    push();
    translate(this.x, height/2);
    rect(0, 0, this.pages/10, 150);
    fill(0);
    text(this.title[0], 0, -50 )
    pop();
  }
}
