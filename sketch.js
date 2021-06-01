var bg;
var circle, circleIMG, circleIMG2;
var bottomBlock, topBlock, leftBlock, rightBlock;
var gameState = 0;
var score = 0;
var triangleIMG1;
var triangleIMG2;
var triangleIMG3;
var triangleIMG4;
var lives = 1;
var enemyGroup;

function preload() {
  
  bg = loadImage("Road2.jpg");
  circleIMG = loadImage("BCarR.png");
  circleIMG2 = loadImage("BCarL.png");
  triangleIMG1 = loadImage("RCarD.png");
  triangleIMG2 = loadImage("RCarL.png");
  triangleIMG3 = loadImage("RCarU.png");
  triangleIMG4 = loadImage("RCarR.png");

}

function setup() {
  createCanvas(1000, 560);

  circle = createSprite(500, 300, 60, 50);
  circle.addImage(circleIMG);
  circle.scale = 0.11;

  topBlock = createSprite(500, -1, 1020, 20);
  bottomBlock = createSprite(500, 565, 1020, 20);
  leftBlock = createSprite(-1, 310, 20, 640);
  rightBlock = createSprite(1001, 310, 20, 640);

  topBlock.visible = false;
  bottomBlock.visible = false;
  leftBlock.visible = false;
  rightBlock.visible = false;

  enemyGroup = new Group();
}

function draw() {
  background(bg);

  if(gameState === 0){
    score = Math.round(frameCount/5);
  }

  if(lives === 0){
    gameState = 1;
    circle.destroy();

    textFont("impact");
    textSize(45);
    fill("black");
    text("GAME OVER", 400, 270);
    textSize(30);
    text("Score: " + score, 438, 300);
    textSize(13);
    text("Press 'R' to restart!", 446, 360);
  }

  if(keyDown("r") && gameState == 1){
    location.reload();
  }

  if(keyDown("right") || keyDown("d")){
    circle.x = circle.x + 5.7;
    circle.addImage(circleIMG);
  }
  if(keyDown("left") || keyDown("a")){
    circle.x = circle.x - 5.7;
    circle.addImage(circleIMG2);
  }

  if(keyDown("up") || keyDown("w")){
    circle.y = circle.y - 5.7;
  }
  if(keyDown("down") || keyDown("s")){
    circle.y = circle.y + 5.7;
  }

  if(circle.isTouching(topBlock)){
    circle.y = circle.y+10;
  }
  if(circle.isTouching(bottomBlock)){
    circle.y = circle.y-10;
  }
  if(circle.isTouching(leftBlock)){
    circle.x = circle.x+10;
  }
  if(circle.isTouching(rightBlock)){
    circle.x = circle.x-10;
  }

  drawSprites();
  spawnTriangles();

  if(enemyGroup.isTouching(circle)){
    lives = 0;
  }

  fill("black");
  textSize(30);
  text(score, 925, 40);

}

  function spawnTriangles(){
  
    if(frameCount%13 === 0 && gameState === 0){
    var dir = Math.round(random(1,4));
    var triangle = createSprite(615, -15, 20, 20);
    triangle.lifetime = 250;
    triangle.scale = 0.11;
    triangle.addImage(triangleIMG1);

    enemyGroup.add(triangle);
    if(dir == 1){
      triangle.velocityY = 5.6;
      triangle.y = -15;
      triangle.x = Math.round(random(40, 960));
      triangle.addImage(triangleIMG1);
    }
    if(dir == 2){
      triangle.velocityX = -5.6;
      triangle.y = Math.round(random(40, 520));
      triangle.x = 1015;
      triangle.addImage(triangleIMG2);
    }
    if(dir == 3){
      triangle.velocityY = -5.6;
      triangle.y = 580;
      triangle.x = Math.round(random(40, 960));
      triangle.addImage(triangleIMG3);
    }
    if(dir == 4){
      triangle.velocityX = 5.6;
      triangle.y = Math.round(random(40, 520));
      triangle.x = -15;
      triangle.addImage(triangleIMG4);
    }
      
  }  
  }  