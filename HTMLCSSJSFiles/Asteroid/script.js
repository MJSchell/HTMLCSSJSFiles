var game = new Phaser.Game(800,600,Phaser.AUTO,'my-game',
{preload: preload, create: create, update: update });

//global variables
var player;
var fireKey;
var asteroidGroup;
var maxSpeed = 100;
//Preload Game Assets - Runs Once At Start
//required functions
function preload(){
  game.load.image('space','assets/images/space-stars.jpg');
  game.load.spritesheet('player','assets/images/spaceship.png',64,64);
  game.load.audio('engineSound','assets/sounds/engine.mp3');
  game.load.spritesheet('asteroid','assets/images/asteroid.png',40,40);
}

// Create Game World - Runs Once After "Preload" finished
function create(){
  
  engineSound = game.add.audio('engineSound',0.3)
  engineSound.volume=0.3;
  engineSound.loop=true;
  game.physics.startSystem(Phaser.Physics.ARCADE);    //pulling the physics lib
  
  //tileSprite(x,y,width,height,image)
  space = game.add.tileSprite(0,0,800,600,'space');
  
  player = game.add.sprite(game.world.centerX,game.world.centerY,'player');
  player.anchor.set(0.5,0.5);
  game.physics.arcade.enable(player);
  player.body.maxVelocity.set(400);
  player.body.drag.set(20);
  player.angle= -90;
  player.body.collideWorldBounds = true;
  //animations.add('name',frame Numbers,how Often,loop?)
  player.animations.add('moving',[0,1,2],10,true);
  
  arrowKey = game.input.keyboard.createCursorKeys();
  fireKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

  asteroidGroup = game.add.group();
  asteroidGroup.enableBody = true;
  // add asteroids to group
    for (var i = 0; i < 10; i++) {
      // create individual asteroid in group
        var asteroid = asteroidGroup.create(game.world.randomX, game.world.randomY, 'asteroid');
        asteroid.anchor.set(0.5, 0.5);
      // randomly select animation for asteroid spinning
        if (Math.random() < 0.5) asteroid.animations.play('spin-clock');
        else asteroid.animations.play('spin-counter');
      // give asteroid random speed and direction
        asteroid.body.velocity.x = Math.random() * maxSpeed;
        if (Math.random() < 0.5) asteroid.body.velocity.x *= -1;

        asteroid.body.velocity.y = Math.random() * maxSpeed;
        if (Math.random() < 0.5) asteroid.body.velocity.y *= -1;
    }
}
game.physics.arcade.collide(player, asteroidGroup, collideAsteroid, null, this);
//This Runs Every Single Frame
function update(){
  if (arrowKey.left.isDown) {
      // rotate player counter-clockwise (negative value)
      player.body.angularVelocity = -200;
  }
  else if (arrowKey.right.isDown) {
      // rotate player clockwise (positive value)
      player.body.angularVelocity = 200;
  }
  else {
      // stop rotating player
      player.body.angularVelocity = 0;
  }
  if (arrowKey.up.isDown) {
    engineSound.volume = 1;
      // accelerate player forward
      game.physics.arcade.accelerationFromRotation(player.rotation, 200, player.body.acceleration);
      player.animations.play('moving')
  }
  else {
      // stop accelerating player
      player.body.acceleration.set(0);
      player.animations.stop();
      player.frame=1;
      engineSound.volume = 0.3;
  }
  
  // will allow space tilesprite to keep scrolling
  if (player.left <= 50) player.left = 50;
  else if (player.right >= game.world.width - 50) player.right = game.world.width - 50;
  if (player.top <= 50) player.top = 50;
  else if (player.bottom >= game.world.height - 50) player.bottom = game.world.height - 50;
  // scroll space tilesprite in opposite direction of player velocity
  space.tilePosition.x = space.tilePosition.x - player.body.velocity.x / 40;
  space.tilePosition.y = space.tilePosition.y - player.body.velocity.y / 40;
  
  // scroll space tilesprite in opposite direction of player velocity
    space.tilePosition.x = space.tilePosition.x - player.body.velocity.x / 40;
    space.tilePosition.y = space.tilePosition.y - player.body.velocity.y / 40;
  
  asteroidGroup.forEach(function (asteroid) {
        game.world.wrap(asteroid, 20);
    });
}


//custom functions

function collideAsteroid(player, asteroid) {
  asteroid.kill();
  game.camera.shake(0.02, 250);
}