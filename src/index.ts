import * as PIXI from "pixi.js"
import { Obstacle, ObstacleFactory } from "./obstacles";
import { GameConstants } from "./gameConstants";
import { animatedBackgroundController } from "./animatedBackgroundController";
import { AnimatedBirdController } from "./birdController";
import { Sprite } from "pixi.js";
import { ObstacleController } from "./obstacleController";
import { Score } from "./Score";

let animatedBackground: animatedBackgroundController;
let bird: AnimatedBirdController;
let obstacleFactory: ObstacleFactory;
let gameOverContainer: PIXI.Container;
let score: Score;
let obsController: ObstacleController;

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
    animatedBackground = new animatedBackgroundController(PIXI.Texture.from("background.png"), GameConstants.gameWidth, GameConstants.gameHeight);
    app.stage.addChild(animatedBackground);

    initObstacleFactory();
    obsController = new ObstacleController(obstacleFactory, app);

    score = new Score();
    score.initScore();
    app.stage.addChild(score.points);

    bird = new AnimatedBirdController([
        PIXI.Texture.from("birdDown.png"),
        PIXI.Texture.from("birdMiddle.png"),
        PIXI.Texture.from("birdUp.png")]);

    app.stage.addChild(bird);

    window.addEventListener("keydown", jumpListener);
    app.ticker.add(() => {

        if (obsController.getCurrentObstacle().pipeUp.getBounds().intersects(bird.getBounds()) ||
            obsController.getCurrentObstacle().pipeDown.getBounds().intersects(bird.getBounds()) ||
            bird.position.y > GameConstants.gameHeight - GameConstants.birdYLimitation ||
            bird.position.y < GameConstants.birdYLimitation) {

            gameOver();
        }
        if (obsController.getCurrentObstacle().coin.getBounds().intersects(bird.getBounds())) {

            obsController.getCurrentObstacle().coin.position.set(-10, 0);
            app.stage.removeChild(obsController.getCurrentObstacle().coin);
            
            score.increaseScore();
        }
    });

}
function jumpListener(e: KeyboardEvent) {
    if (e.key === " ")
        bird.jump();
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


function reset() {

    app.stage.removeChild(score.points);

    bird.resetBirdPosition();
    obsController.resetController();
    score.initScore();

    app.stage.addChild(score.points);
    app.stage.removeChild(gameOverContainer);

    app.start();
}

function initObstacleFactory() {
    let obstacleTemplate = new Obstacle(new Sprite(PIXI.Texture.from("pipeUp.png")),
        new Sprite(PIXI.Texture.from("pipeDown.png")),
        new Sprite(PIXI.Texture.from("goldMedal.png")));

    obstacleFactory = new ObstacleFactory(obstacleTemplate);
}
