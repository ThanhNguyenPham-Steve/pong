class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' });
    }
    create() {
      // Create a graphics object for drawing
      const graphics = this.add.graphics();

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
      for (let y = 10; y < config.height-10; y += dashLength + gapLength) {
          graphics.beginPath();
          graphics.moveTo(config.width / 2, y); // Start of the dash
          graphics.lineTo(config.width / 2, y + dashLength); // End of the dash
          graphics.strokePath();
      }


      const pauseButton = this.add.rectangle(100, 50, 80, 30, 0xF2EAEA).setInteractive({ cursor: 'pointer' });
      const pauseButtonText = this.add.text(100, 50, 'Pause', { fill: '#000000', fontSize: '20px' }).setOrigin(0.5, 0.5);
        // Add hover effects
        pauseButton.on('pointerover', () => {
            this.tweens.add({
                targets: [pauseButton, pauseButtonText], // Apply the effect to both the pauseButton and text
                y: '-=2', // Move up by 10 pixels
                duration: 100, // Short animation duration
                ease: 'Power2', // Easing function
            });
        });

        pauseButton.on('pointerout', () => {
            this.tweens.add({
                targets: [pauseButton, pauseButtonText], // Reset position for both pauseButton and text
                y: '+=2', // Move back down by 10 pixels
                duration: 100, // Short animation duration
                ease: 'Power2', // Easing function
            });
        });
        pauseButton.on('pointerup', () => {
        })
  
    }
  }
  
  