class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/tile sprites
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("jet", "./assets/jet.png");
        this.load.image("starfield", "./assets/starfield.png");
        this.load.image("planet", "./assets/planet.png");
        //load spritesheet
        this.load.spritesheet("explosion", "./assets/explosion.png", {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 8});
    }

    create() {
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, "starfield").setOrigin(0, 0);
        this.planet = this.add.tileSprite(0, 0, 640, 480, "planet").setOrigin(0, 0);

        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize*2, 0x00FF00).setOrigin(0,0);

        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, "rocket").setOrigin(0.5, 0);

        //add spaceships
        this.spaceships = [];
        for (let i=1; i<=spaceshipCount; i++){
            this.spaceships.push(new Spaceship(this, game.config.width + borderUISize * (3+i), borderUISize * (5+i), "spaceship", 0, 10*i).setOrigin(0, 0));
        }

        //add jets
        this.jets = [];
        for (let i=1; i<=jetCount; i++){
            this.jets.push(new Jet(this, game.config.width + borderUISize * (3+i), borderUISize * (5+i), "jet", 0, 10*i).setOrigin(0, 0));
        }
        console.log(this.spaceships);
        console.log("^-^");
        console.log(this.jets);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 9, first: 0}), frameRate: 30
        });

        //initialize score
        this.p1Score = 0;

        //display score
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
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, textConfig);

        //GAME OVER flag
        this.gameOver = false;

        //60-second play clock
        textConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, "GAME OVER", textConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, "Press (R) to Restart or <- for Menu", textConfig).setOrigin(0.5);
            this.text.destroy();
            this.text = this.add.text(game.config.width/2, borderUISize + borderPadding * 2, "0", textConfig);
            this.gameOver = true;
        }, null, this);

        //on-screen timer
        this.timeLeft = game.settings.gameTimer/1000;
        this.text = this.add.text(game.config.width/4, borderUISize + borderPadding * 2, this.timeLeft, textConfig)
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.timeLeft--;
            },
            loop: true
        })

        //high score
        this.highScoreText = this.add.text(game.config.width/2, borderUISize + borderPadding * 2, "HIGH SCORE:" + highScore, textConfig);
        console.log(this.highScoreText);
    }

    update() {
        //update high score <3
        this.highScoreText.destroy();
        if(this.p1Score > highScore){
            highScore = this.p1Score;
        }
        this.highScoreText = this.add.text((game.config.width/2), borderUISize + borderPadding * 2, "HIGH SCORE:" + highScore, textConfig);

        //update timer
        if(!this.gameOver){
            this.text.destroy();
            this.text = this.add.text(game.config.width/4, borderUISize + borderPadding * 2, this.timeLeft, textConfig);
        }

        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;
        this.planet.tilePositionX -= 2;

        if (!this.gameOver) {
        //update rocket (p1)
        this.p1Rocket.update();
        //update spaceships
        for(let i=0; i<spaceshipCount; i++){
            this.spaceships[i].update();
            // console.log(this.spaceships[i].x);
        }
        for(let i=0; i<jetCount; i++){
            this.jets[i].update();
        }
    }

        //check collisions
        for(let i=0; i<spaceshipCount; i++){
            if (this.checkCollision(this.p1Rocket, this.spaceships[i])) {
                this.p1Rocket.reset();
                this.shipExplode(this.spaceships[i]);
            }
        }
        for(let i=0; i<jetCount; i++){
            if (this.checkCollision(this.p1Rocket, this.jets[i])) {
                this.p1Rocket.reset();
                this.shipExplode(this.jets[i]);
            }
        }
    }

    checkCollision(rocket, ship) {
        //simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            }
        else {
            return false;
        }
    }

    shipExplode(ship){
        //temporarily hide ship
        ship.alpha = 0;
        
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0, 0);
        boom.anims.play("explode");             //play explode animation
        boom.on("animationcomplete", () => {    //callback after anim completes
            ship.reset();                       //reset ship position
            ship.alpha = 1;                     //make ship visible again
            boom.destroy();                     //remove explosion sprite
        });

        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        //play explosion
        this.sound.play("sfx_explosion");
    }
}