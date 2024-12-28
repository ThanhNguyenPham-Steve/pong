class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }
    create() {
        this.rounds = 0;
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


        this.computerText = this.add.text(config.width / 2 - 100, 100, `${gameState.computerScore}`, { fill: '#F2EAEA', fontSize: '40px' }).setOrigin(0.5, 0.5);
        this.playerText = this.add.text(config.width / 2 + 100, 100, `${gameState.playerScore}`, { fill: '#F2EAEA', fontSize: '40px' }).setOrigin(0.5, 0.5);

        this.playerPaddle = this.add.rectangle(config.width - 20, config.height / 2, 10, 80, 0xF2EAEA).setOrigin(0, 0);;
        this.computerPaddle = this.add.rectangle(20, config.height / 2, 10, 80, 0xF2EAEA).setOrigin(0, 0);;

        // Create ball
        this.ball = this.add.rectangle(config.width / 2, config.height / 2, 10, 10, 0xF2EAEA).setOrigin(0, 0);
        this.ball.velocity = { x: 0, y: 0 };

        // Player input
        this.cursors = this.input.keyboard.createCursorKeys();

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
            this.pauseGame(); // Pause the game
            this.showPauseMenu(); // Show the pause menu
        });
        this.releaseBall(this.ball);
    }

    async update() {
        if (this.gamePaused) {
            return; // Prevent any movement or logic when the game is paused
        }
        // Ball movement
        this.ball.x += this.ball.velocity.x;
        this.ball.y += this.ball.velocity.y;

        // Ball collision with top and bottom walls
        if (this.ball.y <= 10 || this.ball.y >= config.height - 10) {
            this.ball.velocity.y *= -1;
        }

        // Ball collision with paddles
        if (this.ball.x <= this.computerPaddle.x + this.computerPaddle.width && this.ball.x >= this.computerPaddle.x && this.ball.y >= this.computerPaddle.y && this.ball.y <= this.computerPaddle.y + this.computerPaddle.height) {
            this.ball.velocity.x *= -1;
        }
        else if (this.ball.x + this.ball.width >= this.playerPaddle.x && this.ball.x + this.ball.width <= this.playerPaddle.x + this.playerPaddle.width && this.ball.y >= this.playerPaddle.y && this.ball.y <= this.playerPaddle.y + this.playerPaddle.height) {
            this.ball.velocity.x *= -1;
        }

        // Player paddle movement
        if (this.cursors.up.isDown) {
            this.playerPaddle.y -= 5;
        } else if (this.cursors.down.isDown) {
            this.playerPaddle.y += 5;
        }
        // Computer paddle movement
        const computerPaddleSpeed = gameState.computerSpeed;
        if (this.ball.y > this.computerPaddle.y + this.computerPaddle.height / 2) {
            this.computerPaddle.y += computerPaddleSpeed;
        }
        else if (this.ball.y < this.computerPaddle.y + this.computerPaddle.height / 2) {
            this.computerPaddle.y -= computerPaddleSpeed;
        }


        if (this.playerPaddle.y < 10) {
            this.playerPaddle.y = 10;
        }
        else if (this.playerPaddle.y > config.height - 90) {
            this.playerPaddle.y = config.height - 90;
        }

        if (this.computerPaddle.y < 10) {
            this.computerPaddle.y = 10;
        }
        else if (this.computerPaddle.y > config.height - 90) {
            this.computerPaddle.y = config.height - 90;
        }

        // Ball out of bounds
        if (this.ball.x < -15) {
            gameState.playerScore++;
            this.rounds++;
            this.playerText.setText(`${gameState.playerScore}`);
            this.releaseBall(this.ball);
        }
        else if (this.ball.x > config.width + 15) {
            gameState.computerScore++;
            this.rounds++;
            this.computerText.setText(`${gameState.computerScore}`);
            this.releaseBall(this.ball);
        }
        if (gameState.playerScore == gameState.pointToWin || gameState.computerScore == gameState.pointToWin) {
            this.scene.stop('GameScene');
            this.scene.start('EndScene');
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
            gameState.playerScore = 0;
            gameState.computerScore = 0;
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
    pauseGame() {
        this.gamePaused = true; // Pause the game

    }
    releaseBall(ball) {

        ball.x = config.width / 2;
        ball.y = config.height / 2;
        ball.velocity.x = this.rounds % 2 == 0 ? gameState.ballSpeed : -gameState.ballSpeed;
        while (ball.velocity.y == 0) {
            ball.velocity.y = Math.floor(Math.random() * (gameState.ballSpeed + gameState.ballSpeed + 1)) - gameState.ballSpeed;
        }
    }
}