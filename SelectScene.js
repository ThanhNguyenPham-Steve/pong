class SelectScene extends Phaser.Scene {
    constructor() {
      super({ key: 'SelectScene' });
    }
    create() {
        const diffOptions = ['Easy', 'Medium', 'Hard'];
        let diffSelectedOption = 0
        const levelOptions = ['5', '10', '15'];
        let levelSelectedOption = 0;
        
        // Create a graphics object for drawing
        const graphics0 = this.add.graphics();
        const graphics1 = this.add.graphics();
    
        // Store text objects to update them without recreating
        const textObjects1 = [];
        const textObjects2 = [];

        // Function to draw all options
        const redrawOptions1 = () => {

            diffOptions.forEach((option, index) => {
                const x = this.cameras.main.width / 2 - 150 + index * 150;
                const y = 220;
                const width = 120;
                const height = 50;
                const radius = 20;
                const borderColor = 0xFFFFFF;

                // Draw rounded rectangle
                graphics0.lineStyle(2, borderColor, 1);
                graphics0.fillStyle(index === diffSelectedOption ? 0xF2EAEA : 0x000000, 1);
                graphics0.strokeRoundedRect(x - width / 2, y - height / 2, width, height, radius);
                graphics0.fillRoundedRect(x - width / 2, y - height / 2, width, height, radius);

                // Update or create text
                if (!textObjects1[index]) {
                    const optionText = this.add.text(x, y, option, {
                        fontSize: '20px',
                    }).setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer' });

                    // Add click event for the option
                    optionText.on('pointerup', () => {
                        if (diffSelectedOption !== index) {
                            diffSelectedOption = index; // Update the selected option
                            console.log('Updated selected option:', diffSelectedOption); // Log the updated value
                            redrawOptions1();
                        }
                    });

                    textObjects1[index] = optionText; // Store the text object
                }

                // Update text color based on the selection
                textObjects1[index].setStyle({
                    fill: index === diffSelectedOption ? '#000000' : '#F2EAEA',
                });
            });
        };
        // Function to draw all options
        const redrawOptions2 = () => {

            levelOptions.forEach((option, index) => {
                const x = this.cameras.main.width / 2 - 150 + index * 150;
                const y = 400;
                const width = 120;
                const height = 50;
                const radius = 20;
                const borderColor = 0xFFFFFF;

                // Draw rounded rectangle
                graphics1.lineStyle(2, borderColor, 1);
                graphics1.fillStyle(index === levelSelectedOption ? 0xF2EAEA : 0x000000, 1);
                graphics1.strokeRoundedRect(x - width / 2, y - height / 2, width, height, radius);
                graphics1.fillRoundedRect(x - width / 2, y - height / 2, width, height, radius);

                // Update or create text
                if (!textObjects2[index]) {
                    const optionText = this.add.text(x, y, option, {
                        fontSize: '20px',
                    }).setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer' });

                    // Add click event for the option
                    optionText.on('pointerup', () => {
                        if (levelSelectedOption !== index) {
                            levelSelectedOption = index; // Update the selected option
                            redrawOptions2();
                        }
                    });

                    textObjects2[index] = optionText; // Store the text object
                }

                // Update text color based on the selection
                textObjects2[index].setStyle({
                    fill: index === levelSelectedOption ? '#000000' : '#F2EAEA',
                });
            });
        };

        // Initial draw
        redrawOptions1();
        redrawOptions2();
        // Creates the text on the start screen:
        this.add.text(this.cameras.main.width / 2, 50, "Select Game Level" , { fill: '#F2EAEA', fontSize: '45px' }).setOrigin(0.5,0.5);
        this.add.text(this.cameras.main.width / 2, 150, "Difficulty Level" , { fill: '#F2EAEA', fontSize: '40px' }).setOrigin(0.5,0.5);
        this.add.text(this.cameras.main.width / 2, 330, "Points To Win" , { fill: '#F2EAEA', fontSize: '40px' }).setOrigin(0.5,0.5);
        const button = this.add.rectangle(this.cameras.main.width / 2, 600, 150, 50, 0xF2EAEA).setInteractive({ cursor: 'pointer' });
        const buttonText = this.add.text(this.cameras.main.width / 2, 600, 'Submit', { fill: '#000000', fontSize: '20px' }).setOrigin(0.5, 0.5);
        // Add hover effects
        button.on('pointerover', () => {
            this.tweens.add({
                targets: [button, buttonText], // Apply the effect to both the button and text
                y: '-=2', // Move up by 10 pixels
                duration: 100, // Short animation duration
                ease: 'Power2', // Easing function
            });
        });

        button.on('pointerout', () => {
            this.tweens.add({
                targets: [button, buttonText], // Reset position for both button and text
                y: '+=2', // Move back down by 10 pixels
                duration: 100, // Short animation duration
                ease: 'Power2', // Easing function
            });
        });
        button.on('pointerup', () => {
            if (diffSelectedOption === 0) {
                gameState.computerSpeed = 3;
                gameState.ballSpeed = 5;
            }
            else if (diffSelectedOption === 1) {
                gameState.computerSpeed = 5;
                gameState.ballSpeed = 7;
            }
            else {
                gameState.computerSpeed = 7;
                gameState.ballSpeed = 9;
            }   
            if (levelSelectedOption === 0) {
                gameState.pointToWin = 5;
            }
            else if (levelSelectedOption === 1) {
                gameState.pointToWin = 10;
            }
            else {
                gameState.pointToWin = 15;
            }   
            this.scene.stop('SelectScene');
            this.scene.start('GameScene');
        })
  
    }
  
}