import * as PIXI from "pixi.js"
import { Obstacle, ObstacleFactory } from "./obstacles";
import { GameConstants } from "./gameConstants";
import { AnimatedBackground } from "./animatedBackgroundController";
import { AnimatedBird } from "./birdController";
import { Sprite } from "pixi.js";

let animatedBackground: AnimatedBackground;
let bird: AnimatedBird;
let obstacleFactory: ObstacleFactory;
let gameOverContainer: PIXI.Container;
let score: number;
let scoreText: PIXI.Text;
let textStyle: PIXI.TextStyle;
let obstaclesArray: Obstacle[];

let app = new PIXI.Application({ backgroundColor: GameConstants.backgroundColor, width: GameConstants.gameWidth, height: GameConstants.gameHeight });

document.body.appendChild(app.view);

app.loader.add("background", "simpleSpriteSheet.json")
    .add("pipeUp", "simpleSpriteSheet.json")
    .add("pipeDown", "simpleSpriteSheet.json")
    .add("birdDown", "simpleSpriteSheet.json")
    .add("birdMiddle", "simpleSpriteSheet.json")
    .add("birdUp", "simpleSpriteSheet.json")
    .add("gameText", "simpleSpriteSheet.json")
    .add("overText", "simpleSpriteSheet.json")
    .add("goldMedal", "simpleSpriteSheet.json")
    .load(onAssetsLoaded);

function onAssetsLoaded() {

    animatedBackground = new AnimatedBackground(PIXI.Texture.from("background.png"), GameConstants.gameWidth, GameConstants.gameHeight);
    app.stage.addChild(animatedBackground);

    initObstacleFactory();

    obstaclesArray = [];
    fillObstacleArray();

    initScore();

    bird = new AnimatedBird([
        PIXI.Texture.from("birdDown.png"),
        PIXI.Texture.from("birdMiddle.png"),
        PIXI.Texture.from("birdUp.png")]);

    app.stage.addChild(bird);
    app.ticker.add((delta) => {

        checkAndRemoveObstacle();

        if (obstaclesArray.length < 10)
            obstaclesArray.push(obstacleFactory.createObstacle());

        app.stage.addChild(obstaclesArray[0].pipeUp);
        app.stage.addChild(obstaclesArray[0].pipeDown);
        app.stage.addChild(obstaclesArray[0].coin);


        updateObstacles(delta);

        if (obstaclesArray[0].pipeUp.getBounds().intersects(bird.getBounds()) ||
            obstaclesArray[0].pipeDown.getBounds().intersects(bird.getBounds()) ||
            bird.position.y > GameConstants.gameHeight - GameConstants.birdYLimitation ||
            bird.position.y < GameConstants.birdYLimitation) {

            gameOver();
        }
        if (obstaclesArray[0].coin.getBounds().intersects(bird.getBounds())) {

            obstaclesArray[0].coin.position.set(-10, 0);        
            increaseScore();
        }
    });

}

function increaseScore() {
    score++;
    scoreText.text = score;
    updateScoreTextPosition();
}

function updateScoreTextPosition() {
    let xPos = GameConstants.gameWidth;
    let textWidth = scoreText.width;
    scoreText.position.set(xPos - (textWidth + 15), 10);
}

function initScore() {
    score = 0;
    textStyle = new PIXI.TextStyle({
        fontSize: 25,
        fontWeight: "bold",
        fill: [0xffffff]
    })
    scoreText = new PIXI.Text(score, textStyle);
    scoreText.position.set(GameConstants.gameWidth - (scoreText.width + 15), 10);
    app.stage.addChild(scoreText);
}

function gameOver() {
    gameOverContainer = new PIXI.Container();
    let gameTextSprite = new PIXI.Sprite(PIXI.Texture.from("gameText.png"));
    let overTextSprite = new PIXI.Sprite(PIXI.Texture.from("overText.png"))
    gameTextSprite.position.set(0, gameOverContainer.height / 2);
    overTextSprite.position.set(gameTextSprite.width + 5, gameOverContainer.height / 2);

    gameOverContainer.scale.set(2, 2);

    gameOverContainer.addChild(gameTextSprite);
    gameOverContainer.addChild(overTextSprite);

    gameOverContainer.interactive = true;
    gameOverContainer.buttonMode = true;
    gameOverContainer.on("mousedown", onGameOverButtonDown);

    const xCorrection = (gameTextSprite.width + overTextSprite.width);
    gameOverContainer.position.set(GameConstants.gameWidth / 2 - xCorrection, GameConstants.gameHeight / 2);
    app.stage.addChild(gameOverContainer);

    app.stop();
}

function onGameOverButtonDown() {
    reset();
}
window.addEventListener("keydown", (e) => {
    if (e.key === " ")
        bird.jump();
});

function reset() {

    for (var i = app.stage.children.length - 1; i >= 0; i--) {
        app.stage.removeChild(app.stage.children[i]);
    };

    app.stage.addChild(animatedBackground);

    bird = new AnimatedBird([
        PIXI.Texture.from("birdDown.png"),
        PIXI.Texture.from("birdMiddle.png"),
        PIXI.Texture.from("birdUp.png")]);

    initObstacleFactory();

    obstaclesArray = [];
    fillObstacleArray();

    initScore();

    app.stage.addChild(bird);
    app.start();
}

function initObstacleFactory() {
    let obstacleTemplate = new Obstacle(new Sprite(PIXI.Texture.from("pipeUp.png")),
        new Sprite(PIXI.Texture.from("pipeDown.png")),
        new Sprite(PIXI.Texture.from("goldMedal.png")));

    obstacleFactory = new ObstacleFactory(obstacleTemplate);
}
//----------------------------------------- CODE FROM OBSTACLE.TS -------------------------------------------


function checkAndRemoveObstacle() {
    let toRemove = obstaclesArray.find(obs => obs.pipeDown.x <= 0);
    const index = obstaclesArray.indexOf(toRemove, 0);
    if (index > -1) {
        obstaclesArray.splice(index, 1);
    }
}

function updateObstacles(delta: number) {
    obstaclesArray.forEach(obs => {
        obs.pipeDown.position.x -= delta / 2; //*4
        obs.pipeUp.position.x -= delta / 2; //*4
        obs.coin.position.x -= delta / 2; //*4
    })
}

function fillObstacleArray() {

    for (let i = 0; i < 10; i++) {
        obstaclesArray.push(obstacleFactory.createObstacle());
    }
}
