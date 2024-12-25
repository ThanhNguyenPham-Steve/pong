const gameState = {
    playerScore:0,
    computerScore: 0,
    pointToWin: 0,
  };
  
  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: (window.innerWidth)*3/4,
    backgroundColor: '000000',
    scene: [StartScene, SelectScene, GameScene]
  };
  
  const game = new Phaser.Game(config);
  