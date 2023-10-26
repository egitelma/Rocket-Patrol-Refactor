//Jet prefab

class Jet extends Spaceship {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue + 20;
        this.moveSpeed = game.settings.spaceshipSpeed + 2;
    }
}