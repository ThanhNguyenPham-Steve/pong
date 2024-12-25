class StartScene extends Phaser.Scene {
    constructor() {
      super({ key: 'StartScene' });
    }
    create() {
      // Creates the text on the start screen:
      this.add.text(10, 50, "Pong Game" , { fill: '#F2EAEA', fontSize: '45px' });
      this.add.text(130, 520, ' Ready Count?\nClick to start!', { fill: '#F2EAEA', fontSize: '20px' });
                          
      this.input.on('pointerup', () => {
        // Add logic to transition from StartScene to GameScene:
              this.scene.stop('StartScene')
              this.scene.start('SelectScene')
      });
  
  
    }
  }
  
  