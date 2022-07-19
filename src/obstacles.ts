import { Texture, Sprite, ObservablePoint, Point } from "pixi.js"
import { GameConstants } from "./gameConstants";

export class ObstacleFactory {

    private template: Obstacle;

    constructor(obstacleTemplate: Obstacle) {
        this.template = obstacleTemplate;
    }
    createObstacle(): Obstacle {

        const height = Math.floor(Math.random() * (250 - 50 + 1) + 50);

        let obstacle = new Obstacle(this.template.pipeUp, this.template.pipeDown, this.template.coin);
        obstacle.pipeUp.position.set(GameConstants.gameWidth, 0);
        obstacle.pipeUp.height = height;

        obstacle.pipeDown.position.set(GameConstants.gameWidth + obstacle.pipeDown.width, GameConstants.gameHeight);
        obstacle.pipeDown.anchor.set(1, 1);
        obstacle.pipeDown.height = GameConstants.gameHeight - obstacle.pipeUp.height - GameConstants.gapBetweenPipes;

        obstacle.coin.position.set(GameConstants.gameWidth, (obstacle.pipeUp.height + GameConstants.gapBetweenPipes / 2) - obstacle.coin.height / 2);

        return obstacle;

    }
}

export class Obstacle {
    pipeUp: Sprite;
    pipeDown: Sprite;
    coin: Sprite;

    constructor(pipeUp: Sprite, pipeDown: Sprite, coin: Sprite) {
        this.pipeUp = pipeUp;
        this.pipeDown = pipeDown;
        this.coin = coin;
    }
}