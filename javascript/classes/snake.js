import Grid from "./grid.js";
import Direction from "./direction.js";
export default class Snake {
    constructor(
        upKey = "ArrowUp",
        downKey = "ArrowDown",
        leftKey = "ArrowLeft",
        rightKey = "ArrowRight",
        startPositionColumn = 8,
        bodyColor = "red"
    ){
        this.isPlaying = false,
        this.score = 0,
        this.upKey = upKey;
        this.downKey = downKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.body = [
            new Grid(3, startPositionColumn, bodyColor),
            new Grid(2, startPositionColumn, bodyColor),
        ];
        this.currentDirection = new Direction(0, 1);
        this.nextDirection = new Direction(0, 1);
        this.initialize();
    }
    initialize() {
        // Set up event Listener for keys
        this.listener = this.setEventListener.bind(this);
        document.addEventListener("keydown", this.listener, true);
        this.isPlaying = true;
    };
    setEventListener(event) {
        this.handleKeyEvent(event.key);
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }
    deleteEventListener() {
        document.removeEventListener("keydown", this.listener, true);
    }
    handleKeyEvent(keyValue) {
        if (keyValue === this.upKey && this.nextDirection.y === 0) {
            this.nextDirection.x = 0;
            this.nextDirection.y = -1;
            return;
        } else if (keyValue === this.downKey && this.nextDirection.y === 0) {
            this.nextDirection.x = 0;
            this.nextDirection.y = 1;
            return;
        } else if (keyValue === this.leftKey && this.nextDirection.x === 0) {
            this.nextDirection.x = -1;
            this.nextDirection.y = 0;
            return;
        } else if (keyValue === this.rightKey && this.nextDirection.x === 0) {
            this.nextDirection.x = 1;
            this.nextDirection.y = 0;
            return;
        }
    };
    // Without this function, if player press quickly enough e.g. right arrow while moving down then could press up
    // namely go back to the direction they just came from.
    // I made this function so that player cannot do that. 
    updateCurrentDirection(){
        if (this.nextDirection.x === 0 && this.nextDirection.y === -1 && this.currentDirection.y === 0) {
            this.currentDirection.x = 0;
            this.currentDirection.y = -1;
            return;
        } else if (this.nextDirection.x === 0 && this.nextDirection.y === 1 && this.currentDirection.y === 0) {
            this.currentDirection.x = 0;
            this.currentDirection.y = 1;
            return;
        } else if (this.nextDirection.x === -1 && this.nextDirection.y ===  0 && this.currentDirection.x === 0) {
            this.currentDirection.x = -1;
            this.currentDirection.y = 0;
            return;
        } else if (this.nextDirection.x === 1 && this.nextDirection.y ===  0 && this.currentDirection.x === 0) {
            this.currentDirection.x = 1;
            this.currentDirection.y = 0;
            return;
        }
    }
}