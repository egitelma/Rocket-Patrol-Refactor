//Liza Gitelman
//ROCKET PATROL: INTERPLANETARY BUG EXTERMINATOR
//Approximate time: 12 hours (I wasn't counting but that seems about right)
//Mods chosen:
//      - Display the time remaining (in seconds) onscreen (3pts)
//      - Create a new title screen (3pts)
//      - Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5pts)
//      - Custom mod (Player-inputted configuration) (5pts)
//      - Implement parallax scrolling for the background (3pts)
//      - Track a high score that persists across screens and display it in the UI
//Source:
//      - Planet pixel art: https://stardust-specks.tumblr.com/post/619737437814587392/transparent-pixel-planets-for-pride-month-these (the planet is queer)
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play, CustomMenu]
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;
let textConfig;

//custom menu vars
let spaceshipCount, jetCount, customTime;

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 4;

//high score
let highScore = 0;