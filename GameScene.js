class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' });
    }
    create() {
      // Creates the text on the start screen:
      this.add.text(10, 50, " GameScene" , { fill: '#F2EAEA', fontSize: '45px' });
  
  
    }
  }
  
  