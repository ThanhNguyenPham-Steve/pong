class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' });
    }
    create() {
        // Create a graphics object for drawing
        const graphics = this.add.graphics();
        this.gamePaused = false; // Flag to track if the game is paused
        // Border color and line width
        const lineColor = 0xF2EAEA; // White color
        const lineWidth = 5;
  
        // Dash configuration
        const dashLength = 10; // Length of each dash
        const gapLength = 5;   // Length of the gap between dashes
  
        // Draw top border
        graphics.lineStyle(lineWidth, lineColor, 1);
        graphics.beginPath();
        graphics.moveTo(0, 5);
        graphics.lineTo(config.width, 5);
        graphics.strokePath();
  
        // Draw bottom border
        graphics.beginPath();
        graphics.moveTo(0, config.height - lineWidth);
        graphics.lineTo(config.width, config.height - lineWidth);
        graphics.strokePath();
  
        // Draw dashed middle line (vertical)
        for (let y = 10; y < config.height - 10; y += dashLength + gapLength) {
            graphics.beginPath();
            graphics.moveTo(config.width / 2, y); // Start of the dash
            graphics.lineTo(config.width / 2, y + dashLength); // End of the dash
            graphics.strokePath();
        }
  
  
        const computerText = this.add.text(config.width / 2 - 100, 100, `${gameState.computerScore}`, { fill: '#F2EAEA', fontSize: '40px' }).setOrigin(0.5, 0.5);
        const playerText = this.add.text(config.width / 2 + 100, 100, `${gameState.playerScore}`, { fill: '#F2EAEA', fontSize: '40px' }).setOrigin(0.5, 0.5);
  
  
        // Pause button
        const pauseButton = this.add.rectangle(100, 50, 80, 30, 0xF2EAEA).setInteractive({ cursor: 'pointer' });
        const pauseButtonText = this.add.text(100, 50, 'Pause', { fill: '#000000', fontSize: '20px' }).setOrigin(0.5, 0.5);
  
        // Add hover effects
        pauseButton.on('pointerover', () => {
            this.tweens.add({
                targets: [pauseButton, pauseButtonText],
                y: '-=2', 
                duration: 100,
                ease: 'Power2', 
            });
        });
  
        pauseButton.on('pointerout', () => {
            this.tweens.add({
                targets: [pauseButton, pauseButtonText],
                y: '+=2', 
                duration: 100,
                ease: 'Power2',
            });
        });
  
        pauseButton.on('pointerup', () => {
            this.gamePaused = true;
            this.showPauseMenu(); // Show the pause menu
        });
      }
  
      update() {
        if (this.gamePaused) {
            return; // Prevent any movement or logic when the game is paused
        }
      
    }
    showPauseMenu() {
        // Add pause text
        this.pauseText = this.add.text(config.width / 2, config.height / 2 - 50, 'Paused Game', { fill: '#F2EAEA', fontSize: '40px' }).setOrigin(0.5, 0.5);

        // Create continue button
        this.continueButton = this.add.rectangle(config.width / 2, config.height / 2 + 50, 150, 40, 0xF2EAEA).setInteractive({ cursor: 'pointer' });
        this.continueButtonText = this.add.text(config.width / 2, config.height / 2 + 50, 'Continue', { fill: '#000000', fontSize: '20px' }).setOrigin(0.5, 0.5);

        this.continueButton.on('pointerover', () => {
            this.tweens.add({
                targets: [this.continueButton, this.continueButtonText],
                y: '-=2',
                duration: 100,
                ease: 'Power2',
            });
        });

        this.continueButton.on('pointerout', () => {
            this.tweens.add({
                targets: [this.continueButton, this.continueButtonText],
                y: '+=2',
                duration: 100,
                ease: 'Power2',
            });
        });

        this.continueButton.on('pointerup', () => {
            this.resumeGame(); // Resume the game
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
            this.scene.stop('GameScene'); // Stop the current scene
            this.scene.start('StartScene'); // Change 'HomeScene' to the actual scene name
        });

        // Set a flag to track if the game is paused
        this.gamePaused = true;
    }
    resumeGame() {
        // Hide pause menu
        if (this.pauseText) this.pauseText.destroy();
        if (this.continueButton) this.continueButton.destroy();
        if (this.homeButton) this.homeButton.destroy();
        if (this.continueButtonText) this.continueButtonText.destroy();
        if (this.homeButtonText) this.homeButtonText.destroy();

        this.gamePaused = false; // Unpause the game
    }
}