import { AnimatedSprite, Resource, Texture, Ticker } from "pixi.js";
import { GameConstants } from "./gameConstants";


export class AnimatedBird extends AnimatedSprite {

    private ticker: Ticker;
    constructor(textures: Texture<Resource>[] ) {
        super(textures);

        this.anchor.set(0.5, 0.5);
        this.position.set(100, GameConstants.gameHeight / 2);
        this.loop = true;
        this.animationSpeed = 0.1;
        this.play();
        this.scale.set(2);

        this.createTicker();    
    }

    jump() {
        this.position.y -= GameConstants.birdJumpPower;
    }

    private createTicker() {
        this.ticker = new Ticker();
        this.ticker.add(()=>{
            this.position.y = this.position.y + GameConstants.gravity * 2.5;
        });

        this.ticker.start();
    }
}