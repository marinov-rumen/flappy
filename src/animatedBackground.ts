import { Texture, TilingSprite } from "pixi.js";

// всичко което наследява пикси компонент да си използва собствен тикер
export class AnimatedBackground extends TilingSprite {
    private bgX = 0;
    speed = 1;
    constructor(texture: Texture, width: number, height: number) {
        super(texture, width, height);
        this.position.set(0, 0);
    }

    updateBackgroundMovement() {
        this.bgX = this.bgX - this.speed;
        this.tilePosition.set(this.bgX, this.tilePosition.y);
    }

}