import { Texture, TilingSprite, Ticker } from "pixi.js";


// всичко което наследява пикси компонент да си използва собствен тикер
//  т.е bird вътре в него си има тикер в който се прави самият джъмп като логика и гравитацията пак е в него
// за тук отново нов тикер в който се извършва самото местене да на бекгроунда
// препятствията и те да имат собствен тикер в който да се местят
// да се направи клас колижън чекър в който да се изнесе логиката за колизия и само да се подават обекти, които да се проверяват
export class AnimatedBackground extends TilingSprite {
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