const gameState = {
    playerScore:0,
    computerScore: 0,
    pointToWin: 0,
    computerSpeed:0,
    ballSpeed:0
  };
  
  const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 675,
    backgroundColor: '#000000',
    scene: [StartScene, SelectScene, GameScene, EndScene]
  };
  
  const game = new Phaser.Game(config);
  