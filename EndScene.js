class EndScene extends Phaser.Scene {
    constructor() {
      super({ key: 'EndScene' });
    }
    create() {
      // Creates the text on the start screen:
      if (gameState.playerScore > gameState.computerScore) {
      this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 100, "You Won !!!" , { fill: '#F2EAEA', fontSize: '45px' }).setOrigin(0.5, 0.5);
      }
      else{
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 100, "You Lost!!!" , { fill: '#F2EAEA', fontSize: '45px' }).setOrigin(0.5, 0.5);
      }
      
                          
      // Create continue button
      this.newGameButton = this.add.rectangle(config.width / 2, config.height / 2 + 50, 150, 40, 0xF2EAEA).setInteractive({ cursor: 'pointer' });
      this.newGameButtonText = this.add.text(config.width / 2, config.height / 2 + 50, 'New Game', { fill: '#000000', fontSize: '20px' }).setOrigin(0.5, 0.5);

      this.newGameButton.on('pointerover', () => {
          this.tweens.add({
              targets: [this.newGameButton, this.newGameButtonText],
              y: '-=2',
              duration: 100,
              ease: 'Power2',
          });
      });

      this.newGameButton.on('pointerout', () => {
          this.tweens.add({
              targets: [this.newGameButton, this.newGameButtonText],
              y: '+=2',
              duration: 100,
              ease: 'Power2',
          });
      });

      this.newGameButton.on('pointerup', () => {
          this.scene.stop('EndScene'); // Stop the current scene
          gameState.playerScore=0;
          gameState.computerScore= 0;
          this.scene.start('SelectScene'); // Change 'HomeScene' to the actual scene name
      });

      // Create home button
      this.homeButton = this.add.rectangle(config.width / 2, config.height / 2 + 100, 150, 40, 0xF2EAEA).setInteractive({ cursor: 'pointer' });
      this.homeButtonText = this.add.text(config.width / 2, config.height / 2 + 100, 'Home', { fill: '#000000', fontSize: '20px' }).setOrigin(0.5, 0.5);

      this.homeButton.on('pointerover', () => {
          this.tweens.add({
              targets: [this.homeButton, this.homeButtonText],
              y: '-=2',
              duration: 100,
              ease: 'Power2',
          });
      });

      this.homeButton.on('pointerout', () => {
          this.tweens.add({
              targets: [this.homeButton, this.homeButtonText],
              y: '+=2',
              duration: 100,
              ease: 'Power2',
          });
      });

      this.homeButton.on('pointerup', () => {
          this.scene.stop('EndScene'); // Stop the current scene
          gameState.playerScore=0;
          gameState.computerScore= 0;
          this.scene.start('StartScene'); // Change 'HomeScene' to the actual scene name
      });

  
  
    }
  }