

let textfile;
let imgfile, rows, cols, colormap;
let this_project_better_than_Alexs = true;


  function preload() {
  textfile =  loadStrings("assets/info.txt");
  imgfile =  loadStrings("assets/colorimage.txt");
}


 function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  rows = imgfile.length
  cols = imgfile[0].length
  colormap = new Map([
    ["b", "black"],
    ["w", color(255)],
    ["r", "red"],
    ["l", "brown"],
    ["p", "purple"]
  ]);
}

function drawimage(){
  let size = 50;
  for (let y = 0; y < rows; y++){
    let currrow = imgfile[y];
    for(let x = 0; x < cols; x ++){
      let currkey = currrow[x];
      noStroke();
      fill(colormap.get(currkey));
      square(x*size, y* size, size)
    }
  }
}

function draw() {
  background(220);
  processtext();
  drawimage();
  if (this_project_better_than_Alexs === true){
    textAlign(CENTER);
    fill(0);
    textSize(50);
    text("Mine Is Better Than Alex's", width/3, height/2 * 0.2 )
  }
}


function processtext(){
  let splitwords = textfile[0].split(" ");
  print(splitwords)
  let spltchars = textfile[1].split(" ");
  print(spltchars)
  let spreadchars = [...textfile[2]];
  print(spreadchars)
}


