class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio
        this.load.audio("sfx_select", "./assets/sfx_select.wav");
        this.load.audio("sfx_explosion", "./assets/sfx_explosion.wav");
        this.load.audio("sfx_rocket", "./assets/sfx_rocket.wav");
        //title image
        this.load.image("title", "./assets/title.png");
    }

    create() {
        textConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        }

        //title screen
        this.title = this.add.tileSprite(0, 0, 640, 480, "title").setOrigin(0, 0);

        //show menu text
        this.add.text(game.config.width/2, game.config.height-64, "Use ←→ arrows to move & (F) to fire", textConfig).setOrigin(0.5);
        textConfig.backgroundColor = "#00FF00";
        textConfig.color = "#000";
        this.add.text((game.config.width/4) * 3, game.config.height/2 + borderUISize + borderPadding + 32, "← for Novice", textConfig).setOrigin(0.5);
        this.add.text((game.config.width/4) * 3, game.config.height/2 + borderUISize + borderPadding + 64, "→ for Expert", textConfig).setOrigin(0.5);
        this.add.text((game.config.width/4) * 3, game.config.height/2 + borderUISize + borderPadding + 96, "↓ for Custom", textConfig).setOrigin(0.5);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            spaceshipCount = 5;
            jetCount = 3;
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play("sfx_select");
            this.scene.start("playScene");
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard mode
            spaceshipCount = 3;
            jetCount = 2;
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play("sfx_select");
            this.scene.start("playScene");
        }

        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            //custom settings
            this.sound.play("sfx_select");
            this.scene.start("customMenuScene");
        }
    }
}