class SelectScene extends Phaser.Scene {
    constructor() {
      super({ key: 'SelectScene' });
    }
    create() {
      // Creates the text on the start screen:
      this.add.text(10, 50, " SelectScene" , { fill: '#F2EAEA', fontSize: '45px' });
  
  
    }
  }
  
  