//loading variables
var myEngine, myWorld;

var backgroundImg, brickImg, brick1, ball;
var stand;

var ball, ballImg

var bricks;

var score = 0;

var brnum = 0;

var gameTime = 0;

function preload(){
  //loading images
  backgroundImg = loadImage("bg.jpg");
  ballImg = loadImage("ball.png");
  brickImg = loadImage("brick.png");
}
function setup() {
  createCanvas(800,400);

  //creating stand
  stand = createSprite(400,385,50,20);
  stand.shapeColor= "red";

  //creating ball and giving it velocity
  ball = createSprite(400,355, 50,50);
  ball.velocityX = 10 
  ball.addImage(ballImg);
  ball.scale = 0.25;

  //creating a variable for edge for bounceOff command
  edges = createEdgeSprites();

  //creating abricks group 
  bricks = new Group();

  //calling brick row function to create brick row
  createBrickRow(50);
  createBrickRow(90);
  createBrickRow(130);
  createBrickRow(170);
  createBrickRow(210);
  createBrickRow(250);
}



function draw() {
  //loading image to background
  background(backgroundImg);

  //making stand move with ball
  stand.x = ball.x;

  //creating countdown
  gameTime = gameTime + Math.round(getFrameRate()/60);

  //giving ball gravity
  ball.y = ball.y + 3;

  //making stand bounce off edges
  stand.bounceOff(edges[0]);
  stand.bounceOff(edges[1]);

  //making ball bounce off bricks, edges and collide with stand
  ball.bounceOff(bricks, brickHit);
  ball.bounceOff(edges[0]);
  ball.bounceOff(edges[1]);
  ball.bounceOff(edges[2]);
  ball.collide(stand);

  //giving ball different velocities on the press of different arrows
  if(keyDown("UP_ARROW") && ball.y >= 340){
    ball. velocityY = -10;
  } 
  if(keyDown("RIGHT_ARROW") && ball.y >= 340){
    ball.velocityX = 10;
    ball.velocityY = -10;
  }
  if(keyDown("LEFT_ARROW") && ball.y >= 340){
    ball.velocityX = -10;
    ball.velocityY = -10;
  }

  drawSprites();

  //displaying win text if all bricks are broken before countdown finishes
  if(brnum === 0 && gameTime <= 1400){
    textSize(30);
    fill("red");
    text("You win!", 375 ,200);
  } 
  // displaying lose text if all bricks aren't broken before countdown finishes
  else if(brnum > 0 && gameTime>= 1400){
    var over = createSprite(400,200,800,400);
    over.shapeColor = "pink";
    textSize(30);
    fill("red");
    text("You took too long!", 300 ,200);
  }

  //making instruction and countdown text disappear when player has lost or won
  if(brnum > 0 && gameTime < 1400){
    textSize(20);
    fill("blue");
    text("Press left, right and up arrow key to move the ball", 200 ,300);
    fill("brown");
    text("Countdown remaining:"+gameTime+"/1400", 500 ,20);
  }
}

//destroying brick if ball touches it and decreasing total number of bricks
function brickHit(ball, brick){
  brick.destroy();
  brnum = brnum - 1
  console.log(brnum);
}

//using for loop to create brick rows
function createBrickRow(y) {
  for(var c=0; c<11; c++){
    var brick = createSprite(35+76*c,y,60, 35);
    brick.addImage(brickImg);
    brick.scale = 0.35
    bricks.add(brick);
    brick.setCollider("rectangle", 0,0, 50, 50);
    brnum = brnum + 1
  }
}
