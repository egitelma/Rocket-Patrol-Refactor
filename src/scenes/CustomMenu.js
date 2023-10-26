class CustomMenu extends Phaser.Scene {
    constructor() {
        super("customMenuScene");
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

        //show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, "CUSTOM SETTINGS", textConfig).setOrigin(0.5);
        textConfig.backgroundColor = "#00FF00";
        textConfig.color = "#000";

        //custom menu values to update
        this.spaceshipOpen = false; //are we inputting number of spaceships?
        this.jetOpen = false;
        this.timeOpen = false;
        this.allSet = false; //are we ready to go?

        //text values to initialize
        this.spaceshipText = this.add.text(game.config.width/4, game.config.height/2, "← FOR SPACESHIPS", textConfig).setOrigin(0.5);
        this.jetText = this.add.text((game.config.width/4) * 3, game.config.height/2, "→ FOR JETS", textConfig).setOrigin(0.5);
        this.timeText = this.add.text(game.config.width/2, game.config.height/2 - 100, "↑ FOR TIME", textConfig).setOrigin(0.5);
        this.spaceshipTextArray = []; //i love arrays
        this.jetTextArray = []; 
        this.timeTextArray = []; 

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        this.spaceshipText.destroy();
        this.jetText.destroy();
        this.timeText.destroy();
        for(let i=0; i<this.spaceshipTextArray.length; i++){
            this.spaceshipTextArray[i].destroy();
        }
        for(let i=0; i<this.jetTextArray.length; i++){
            this.jetTextArray[i].destroy();
        }
        for(let i=0; i<this.timeTextArray.length; i++){
            this.timeTextArray[i].destroy();
        }

        //text & handling for respective menus
        //not in a menu
        if(!this.spaceshipOpen && !this.jetOpen && !this.timeOpen){ 
            this.spaceshipText = this.add.text(game.config.width/4, game.config.height/2, "← FOR SPACESHIPS", textConfig).setOrigin(0.5);
            this.jetText = this.add.text((game.config.width/4) * 3, game.config.height/2, "→ FOR JETS", textConfig).setOrigin(0.5);
            this.timeText = this.add.text(game.config.width/2, game.config.height/2 - 100, "↑ FOR TIME", textConfig).setOrigin(0.5);
        }
        //spaceship menu
        else if (this.spaceshipOpen) {
            this.jetText.destroy();
            this.timeText.destroy();
            this.spaceshipTextArray.push(this.add.text(game.config.width/4, game.config.height/2, "← FOR 3 SHIPS", textConfig).setOrigin(0.5));
            this.spaceshipTextArray.push(this.add.text((game.config.width/4)*3, game.config.height/2, "→ FOR 7 SHIPS", textConfig).setOrigin(0.5));
            this.spaceshipTextArray.push(this.add.text(game.config.width/2, game.config.height/2-100, "↑ FOR 5 SHIPS", textConfig).setOrigin(0.5));
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
                spaceshipCount = 3;
                this.spaceshipOpen = false;
                this.sound.play("sfx_select");
            }
            if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
                spaceshipCount = 7;
                this.spaceshipOpen = false;
                this.sound.play("sfx_select");
            }
            if (Phaser.Input.Keyboard.JustDown(keyUP)){
                spaceshipCount = 5;
                this.spaceshipOpen = false;
                this.sound.play("sfx_select");
            }
        }
        //jet menu
        else if (this.jetOpen) {
            this.spaceshipText.destroy();
            this.timeText.destroy();
            this.jetTextArray.push(this.add.text(game.config.width/4, game.config.height/2, "← FOR 0 JETS", textConfig).setOrigin(0.5));
            this.jetTextArray.push(this.add.text((game.config.width/4)*3, game.config.height/2, "→ FOR 4 JETS", textConfig).setOrigin(0.5));
            this.jetTextArray.push(this.add.text(game.config.width/2, game.config.height/2-100, "↑ FOR 2 JETS", textConfig).setOrigin(0.5));
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
                jetCount = 0;
                this.jetOpen = false;
                this.sound.play("sfx_select");
            }
            if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
                jetCount = 4;
                this.jetOpen = false;
                this.sound.play("sfx_select");
            }
            if (Phaser.Input.Keyboard.JustDown(keyUP)){
                jetCount = 2;
                this.jetOpen = false;
                this.sound.play("sfx_select");
            }
        }
        //time menu
        else {
            this.spaceshipText.destroy();
            this.jetText.destroy();
            this.timeTextArray.push(this.add.text(game.config.width/4, game.config.height/2, "← FOR 30 SECONDS", textConfig).setOrigin(0.5));
            this.timeTextArray.push(this.add.text((game.config.width/4)*3, game.config.height/2, "→ FOR 90 SECONDS", textConfig).setOrigin(0.5));
            this.timeTextArray.push(this.add.text(game.config.width/2, game.config.height/2-100, "↑ FOR 60 SECONDS", textConfig).setOrigin(0.5));
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
                customTime = 30000;
                this.timeOpen = false;
                this.sound.play("sfx_select");
            }
            if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
                customTime = 90000;
                this.timeOpen = false;
                this.sound.play("sfx_select");
            }
            if (Phaser.Input.Keyboard.JustDown(keyUP)){
                customTime = 60000;
                this.timeOpen = false;
                this.sound.play("sfx_select");
            }
        }

        //navigation in menus
        if (!this.spaceshipOpen && !this.jetOpen && !this.timeOpen){
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
                //spaceships
                this.spaceshipOpen = true;
                this.sound.play("sfx_select");
            }
            if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
                //jets
                this.jetOpen = true;
                this.sound.play("sfx_select");
            }
            if (Phaser.Input.Keyboard.JustDown(keyUP)){
                //timer
                this.timeOpen = true;
                this.sound.play("sfx_select");
            }
        }

        //checking if we can start the game
        if(spaceshipCount != undefined && jetCount != undefined && customTime != undefined){
            this.allSet = true;
        }

        if (this.allSet){
            this.spaceshipText.destroy();
            this.jetText.destroy();
            this.timeText.destroy();
            this.add.text(game.config.width/2, game.config.height/2 + 200, "ALL VALUES ENTERED - ↓ TO BEGIN", textConfig).setOrigin(0.5);
            if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
                //custom settings
                game.settings = {
                    spaceshipSpeed: 4,
                    gameTimer: customTime
                }
                this.sound.play("sfx_select");
                this.scene.start("playScene");
            }
        }
    }
}