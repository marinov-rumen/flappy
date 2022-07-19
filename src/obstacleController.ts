import { Application, Ticker } from "pixi.js";
import { Obstacle, ObstacleFactory } from "./obstacles";

export class ObstacleController {
    private obstaclesArray: Obstacle[];
    private obstacleFactory: ObstacleFactory;
    private app: Application;
    private ticker: Ticker;

    constructor(obstacleFactory: ObstacleFactory, app: Application) {
        this.obstaclesArray = [];
        this.obstacleFactory = obstacleFactory;
        this.app = app;
        this.fillObstacleArray();
        this.createTicker();
    }

    getCurrentObstacle() {
        return this.obstaclesArray[0];
    }

    private fillObstacleArray() {

        for (let i = 0; i < 10; i++) {
            this.obstaclesArray.push(this.obstacleFactory.createObstacle());
        }
    }

    private checkAndRemoveObstacle() {
        let toRemove = this.obstaclesArray.find(obs => obs.pipeDown.x <= 0);
        const index = this.obstaclesArray.indexOf(toRemove, 0);
        if (index > -1) {
            this.obstaclesArray.splice(index, 1);
        }
    }

    private updateObstacles(delta: number) {
        this.obstaclesArray.forEach(obs => {
            obs.pipeDown.position.x -= delta / 2; //*4
            obs.pipeUp.position.x -= delta / 2; //*4
            obs.coin.position.x -= delta / 2; //*4
        })
    }

    private createTicker() {
        this.ticker = new Ticker();

        this.ticker.add((delta) => {
            this.checkAndRemoveObstacle();

            if (this.obstaclesArray.length < 10)
                this.obstaclesArray.push(this.obstacleFactory.createObstacle());

            this.app.stage.addChild(this.obstaclesArray[0].pipeUp);
            this.app.stage.addChild(this.obstaclesArray[0].pipeDown);
            this.app.stage.addChild(this.obstaclesArray[0].coin);

            this.updateObstacles(delta);
        })

        this.ticker.start();
    }

    resetController() {
        this.obstaclesArray = [];
        this.fillObstacleArray();
        this.ticker.destroy();
        this.createTicker();
    }
}