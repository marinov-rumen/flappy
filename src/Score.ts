import { Text, TextStyle } from "pixi.js"
import { GameConstants } from "./gameConstants";

export class Score {
    private score: number
    points: Text;
    textStyle: TextStyle;

    constructor() {
        this.score = 0;
        this.textStyle = new TextStyle();
        this.points = new Text();
    }

    //#region Public Methods
    increaseScore() {
        this.score++;
        this.points.text = this.score;
        this.updateScoreTextPosition();
    }

    initScore() {
        this.score = 0;
        this.textStyle = new TextStyle({
            fontSize: 25,
            fontWeight: "bold",
            fill: [0xffffff]
        })

        this.points = new Text(this.score, this.textStyle);
        this.points.position.set(GameConstants.gameWidth - (this.points.width + 15), 10);
    }

    resetScore() {
        this.score = 0;
        this.points = new Text(this.score, this.textStyle);
    }
    //#endregion

    //#region Private Methods
    private updateScoreTextPosition() {
        let xPos = GameConstants.gameWidth;
        let textWidth = this.points.width;
        this.points.position.set(xPos - (textWidth + 15), 10);
    }
    //#endregion
}