import { Texture, TilingSprite, Ticker } from "pixi.js";

export class animatedBackgroundController extends TilingSprite {
    private bgX = 0;
    private ticker: Ticker;
    speed = 1;
    constructor(texture: Texture, width: number, height: number) {
        super(texture, width, height);
        this.position.set(0, 0);
      
        this.createTicker();
    }

    private createTicker() {
        this.ticker = new Ticker();
        this.ticker.add(()=>{
            this.updateBackgroundMovement();
        });

        this.ticker.start();
    }
    private updateBackgroundMovement() {
        this.bgX = this.bgX - this.speed;
        this.tilePosition.set(this.bgX, this.tilePosition.y);
    }

}