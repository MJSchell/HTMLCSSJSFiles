var game = new Phaser.Game(800,600,Phaser.AUTO,'my-game',{
  preload: preload,
  create: create,
  update: update
});

//global variables
var logo;
var spacebar;
var hello1,hello2,hello3;
var score=100;
var highscore=100;
var scoreText,matchText;
var match2Sound,match3Sound;
var allowed=true;

//required functions
function preload(){
  //game.load.image('phaser-logo','assets/phaser.png
  //loading a spritesheet called hello that is in the file hello-sprite that are 64x64
  game.load.spritesheet('hello','assets/hello-sprite.png',64,64);
  game.load.audio('spin','assets/spinner.mp3')
  game.load.audio('coin','assets/coin.wav')
  game.load.audio('pu','assets/power-up.wav')
}

function create(){
  //logo = game.add.image(400,300,'phaser-logo');
  //logo.anchor.setTo(0.5,0.5);
  hello1 = game.add.sprite(game.world.centerX,game.world.centerY,'hello');
  hello1.anchor.set(1,0.5);

  hello2 = game.add.sprite(game.world.centerX,game.world.centerY,'hello');
  hello2.anchor.set(0,0.5);

  hello3 = game.add.sprite(game.world.centerX,game.world.centerY,'hello');
  hello3.anchor.set(-1,0.5);   


  
  spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

  spinSound = game.add.audio('spin', 0.3);
  match2Sound = game.add.audio('coin',0.5);
  match3Sound = game.add.audio('pu',0.75);
  spinSound.loop = true;

  scoreText = game.add.text(game.world.centerX, game.world.centerY + 80,
        'Use Spacebar to Spin',
        { font: 'Arial', fontSize: '20px', fontStyle: 'bold', fill: '#ffffff' });
    scoreText.setShadow(1, 1, '#000000', 2);
    matchText = game.add.text(game.world.centerX+50, game.world.centerY + 80,
        '',
        { font: 'Arial', fontSize: '20px', fontStyle: 'bold', fill: '#ffffff' });
    matchText.setShadow(1, 1, '#000000', 2);
  highscoreText = game.add.text(game.world.centerX+25, game.world.centerY + 100,
        '',
        { font: 'Arial', fontSize: '20px', fontStyle: 'bold', fill: '#ffffff' });
    highscoreText.setShadow(1, 1, '#000000', 2);
}
//This Runs Every Single Frame
function update() {
    if (spacebar.justDown) {
      spinSound.play();
      matchText.text="";
      highscoreText.text="";
    }
    else if (spacebar.isDown) {
      hello1.frame = Math.floor(Math.random() * 6);
      hello2.frame = Math.floor(Math.random() * 6);
      hello3.frame = Math.floor(Math.random() * 6);
    }
    else if (spacebar.justUp) {
      spinSound.stop();
      checkMatch();
    }
    
}

/*
Block
    Comment
*/

//custom functions

function checkMatch() {
    if (allowed==true){
      if (hello1.frame == hello2.frame && hello2.frame == hello3.frame) {
          // all 3 match
          game.stage.backgroundColor = '#65fc95';
          score = score + 100;
          match3Sound.play();
          matchText.fill = '#00ff00';
          matchText.text='Match Three +$100'
      }
      else if (hello1.frame == hello2.frame || hello2.frame == hello3.frame
      || hello1.frame == hello3.frame) {
          // any 2 match
          game.stage.backgroundColor = '#6699ff'
          score = score + 20;
          match2Sound.play();
          matchText.fill = '#00ff00';
          matchText.text='Match Two +$20'
      }
      else {
          // none match
          score = score - 10;
          matchText.fill = '#00ff00';
        game.stage.backgroundColor = '#8514db';
      }
      scoreText.text = "$"+score;
      if (score>highscore){
        highscore=score
        highscoreText.fill = '#00ff00';
        highscoreText.text='New HighScore: $'+score;
      }
    }
    if (score<=0){
      scoreText.text = "GAME OVER!";
      allowed=false;
      game.stage.backgroundColor = '#db1414'
    }
}
