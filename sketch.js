var forest, forestImg;
var hunter, hunterImg, hunterJumpImg;
var edges;
var rock, rockImg, rockGroup;
var animal, elephantImg, snakeImg, tigerImg, lionImg, dragonImg, fireImg, gunUpImg ;
var rand, srandom;
var lionGroup, elephantGroup, snakeGroup, tigerGroup, dragonGroup;
var count = 0;
var lion, elephant, snake, tiger, dragon;

function preload(){

  forestImg = loadImage("img_edit/forest1.jpg");
  hunterImg = loadAnimation("img_edit/1.png", "img_edit/2.png", "img_edit/3.png", "img_edit/4.png", "img_edit/5.png", "img_edit/6.png");
  hunterJumpImg = loadAnimation("img_edit/jump1.png", "img_edit/jump2.png");
  rockImg = loadImage("img_edit/rock1.png");
  elephantImg = loadAnimation("img_edit/elephant/1.png", "img_edit/elephant/2.png", "img_edit/elephant/3.png", "img_edit/elephant/4.png", "img_edit/elephant/5.png", "img_edit/elephant/6.png", "img_edit/elephant/7.png", "img_edit/elephant/8.png", "img_edit/elephant/9.png", "img_edit/elephant/10.png", "img_edit/elephant/11.png", "img_edit/elephant/12.png");
  snakeImg = loadAnimation("img_edit/snake/0.png", "img_edit/snake/1.png", "img_edit/snake/2.png", "img_edit/snake/3.png", "img_edit/snake/4.png", "img_edit/snake/5.png", "img_edit/snake/6.png", "img_edit/snake/7.png", "img_edit/snake/8.png", "img_edit/snake/9.png");
  tigerImg = loadAnimation("img_edit/tiger/0.png", "img_edit/tiger/1.png", "img_edit/tiger/1.png", "img_edit/tiger/2.png", "img_edit/tiger/3.png", "img_edit/tiger/4.png", "img_edit/tiger/5.png", "img_edit/tiger/6.png", "img_edit/tiger/7.png", "img_edit/tiger/8.png");
  lionImg = loadAnimation("img_edit/lion/0.png", "img_edit/lion/1.png", "img_edit/lion/2.png", "img_edit/lion/3.png", "img_edit/lion/4.png", "img_edit/lion/5.png", "img_edit/lion/6.png", "img_edit/lion/7.png", "img_edit/lion/8.png");
  dragonImg = loadAnimation("img_edit/dragon/0.png", "img_edit/dragon/1.png", "img_edit/dragon/2.png", "img_edit/dragon/3.png", "img_edit/dragon/4.png", "img_edit/dragon/5.png", "img_edit/dragon/6.png", "img_edit/dragon/7.png");
  fireImg = loadAnimation("img_edit/fire/1.png", "img_edit/fire/2.png", "img_edit/fire/3.png", "img_edit/fire/4.png", "img_edit/fire/5.png", "img_edit/fire/6.png");
  gunUpImg = loadAnimation("img_edit/fire/fire1.png", "img_edit/fire/fire2.png", "img_edit/fire/fire3.png", "img_edit/fire/fire4.png");

}

function setup() {

  createCanvas(displayWidth, displayHeight-110);

  forest = createSprite(displayWidth/2, displayHeight/2-50, displayWidth, displayHeight);
  forest.addImage("forest", forestImg);
  forest.scale = 1.7;
  forest.velocityX = -2;

  hunter = createSprite(displayWidth/3, displayHeight-250);
  hunter.addAnimation("hunter", hunterImg);
  hunter.scale = 0.5;
  hunter.setCollider("rectangle", 0, 0);
  hunter.debug = true;

  lionGroup = new Group();
  elephantGroup = new Group();
  snakeGroup = new Group();
  tigerGroup = new Group();
  dragonGroup = new Group();

}

function draw() {

  background("black");  

  if(forest.x < 200){

    forest.x = forest.width/2;

  }

  edges = createEdgeSprites();
  hunter.collide(edges[3]);
  
  if(keyWentDown("space")) {

    hunter.velocityY = -10;
    hunter.addAnimation("hunter", hunterJumpImg);
  }
  
  hunter.velocityY = hunter.velocityY + 0.8;

  if(keyWentUp("space")){

    hunter.addAnimation("hunter", hunterImg);

  }

  if(keyDown("space") && keyDown("right")){

    hunter.velocityY = -8;
    hunter.x = hunter.x + 10;
    hunter.addAnimation("hunter", hunterJumpImg);

    //hunter should not out of the screen
    if(hunter.y < displayHeight/8){

      hunter.velocityY = 0;

    }

    //if the hunter is moving out of the screen through right edge => reset
    if(hunter.x > displayWidth){

      hunter.x = displayWidth/8;

    }

  }

  if(keyDown("left") && keyDown("space")){

    hunter.velocityY = -8;
    hunter.x = hunter.x - 10;
    hunter.addAnimation("hunter", hunterJumpImg);

    if(hunter.x < 20){

      hunter.x = displayWidth/8;

    }

  }

  if(keyWentDown("down")){

    hunter.addAnimation("hunter", fireImg);

    //hunter hunting animals
    if(lionGroup.isTouching(hunter)){

      lionGroup.destroyEach();
      count = count + 1;

    }

    if(elephantGroup.isTouching(hunter)){

      elephantGroup.destroyEach();
      count = count + 1;

    }

    if(snakeGroup.isTouching(hunter)){

      snakeGroup.destroyEach();
      count = count + 1;

    }

    if(tigerGroup.isTouching(hunter)){

      tigerGroup.destroyEach();
      count = count + 1;
    
    }

    if(dragonGroup.isTouching(hunter)){

      dragonGroup.destroyEach();
      count = count + 1;

    }

  }

  if(keyWentUp("down")){

    hunter.addAnimation("hunter", hunterImg);;

  }

  if(keyWentDown("up")){

    hunter.addAnimation("hunter", gunUpImg);
    
    if(dragonGroup.isTouching(hunter)){

      dragonGroup.destroyEach();
      count = count + 1;

    }

  }

  if(keyWentUp("up")){

    hunter.addAnimation("hunter", hunterImg);

  }

  

  //animals();

  fire();

  Lion();

  Elephant();

  Snake();

  Tiger();
  
  Dragon();

  if(lionGroup.isTouching(elephantGroup) || lionGroup.isTouching(tigerGroup) || lionGroup.isTouching(dragonGroup) || lionGroup.isTouching(snakeGroup)){

    lionGroup.destroyEach();

  }

  if(tigerGroup.isTouching(lionGroup) || tigerGroup.isTouching(snakeGroup) || tigerGroup.isTouching(elephantGroup) || tigerGroup.isTouching(dragonGroup)){

    tigerGroup.destroyEach();

  }

  if(dragonGroup.isTouching(lionGroup) || dragonGroup.isTouching(snakeGroup) || dragonGroup.isTouching(tigerGroup) || dragonGroup.isTouching(elephantGroup)){

    dragonGroup.destroyEach();

  }

  if(snakeGroup.isTouching(lionGroup) || snakeGroup.isTouching(tigerGroup) || snakeGroup.isTouching(dragonGroup) || snakeGroup.isTouching(elephantGroup)){

    snakeGroup.destroyEach();

  }

  if(elephantGroup.isTouching(lionGroup) || elephantGroup.isTouching(tigerGroup) || elephantGroup.isTouching(snakeGroup) || elephantGroup.isTouching(snakeGroup) || elephantGroup.isTouching(dragonGroup)){

    elephantGroup.destroyEach();

  }

  //when the animal hits the hunter, 1 life of hunter will be reduced
  


  drawSprites();

  textSize(20);
  fill ("yellow")
  text("SCORE : " + count, displayWidth - 200, displayHeight/8);

}




