var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var dogIMG;
var happyDogIMG;
function preload()
{
  happyDogIMG=loadImage("images/dogImg1.png");
	dogIMG=loadImage("images/dogImg.png");
}


function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,280,2,2);
  dog.scale=0.5;
  dog.addImage(dogIMG);
  //happyDog.addImage(happyDogIMG);
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
background(46,139,87);
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogIMG);
  dog.scale=0.5;
}
  drawSprites();
  textSize(30);
  fill (red);
  stroke(black);
  text("Food remaining : "+foodS, 100, 50);
  text("PRESS THE UP ARROW KEY TO FEED THE DOG",100, 450 );
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
  Food:x
  })
}


