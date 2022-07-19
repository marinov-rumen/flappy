import { AnimatedSprite, Resource, Texture } from "pixi.js";
import { GameConstants } from "./gameConstants";


export class AnimatedBird extends AnimatedSprite {

    constructor(textures: Texture<Resource>[] ) {
        super(textures);

        this.anchor.set(0.5, 0.5);
        this.position.set(100, GameConstants.gameHeight / 2);
        this.loop = true;
        this.animationSpeed = 0.1;
        this.play();
        this.scale.set(2);
    }

    jump() {
        this.position.y -= GameConstants.birdJumpPower;
    }
}