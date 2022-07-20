import { Sprite } from "pixi.js"
import { GameConstants } from "./gameConstants";
import { v4 as uuidv4 } from 'uuid';

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

        obstacle.coin.name = obstacle.id;
        obstacle.pipeUp.name = obstacle.id;
        obstacle.pipeDown.name = obstacle.id;

        return obstacle;

    }
}

export class Obstacle {
    pipeUp: Sprite;
    pipeDown: Sprite;
    coin: Sprite;
    readonly id: string;
    constructor(pipeUp: Sprite, pipeDown: Sprite, coin: Sprite) {
        this.pipeUp = pipeUp;
        this.pipeDown = pipeDown;
        this.coin = coin;
        this.id = uuidv4();
    }
}