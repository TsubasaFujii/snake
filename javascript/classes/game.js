import Snake from "./snake.js";
import Apple from "./apple.js";

export default class Game {
    constructor (playerNumber, display){
        this.display = display;
        this.players = new Array();
        switch (playerNumber) {
            case 1:
                this.players.push(new Snake());
                break;
            case 2:
                this.players.push(new Snake());
                this.players.push(new Snake("w", "s", "a", "d", 3, "blue"));
                break;
        }
        this.apple = new Apple(this.display.board.grid, this.players);

        // draw snake
        this.players.forEach((snake) => {
            snake.body.forEach((bodyPart) => {
                this.display.draw(bodyPart);
            });
        });
        // draw apple
        this.display.draw(this.apple.tile);
    }
    isIntersecting(snake) {
        const head = snake.body[0]
        const crushedIntoWall =
            head.row > this.display.board.grid ||
            head.column > this.display.board.grid ||
            head.row < 1 ||
            head.column < 1;
        if (crushedIntoWall) return true;
        // iterate except the head and the tail, which isn't visible on the screen yet 
        const tangled = snake.body
            .slice(1, snake.body.length-1)
            .some(
            (bodyPart) =>
                bodyPart.row === head.row &&
                bodyPart.column === head.column
            );
        if (tangled) return true;
        const hitOpponent = () => {
            // Happens only for 2 players
            if (this.players.length < 2){
                return false;
            }
            // Determining which snake is opponent in the array using upKey value
            let opponent;
            for (const player of this.players) {
                if (player != snake) {
                    opponent = player;
                    break;
                }
            }
            if (!opponent.isPlaying) {
                return false;
            }
            return opponent.body.some((bodyPart) => {
                return head.column === bodyPart.column && head.row === bodyPart.row;
            });
        };
        if (hitOpponent()) {
            return true;
        }
        return false;
    };
    /* snake movement */
    update(intervalID) {
        for (let index = 0; index < this.players.length; index++) {
            const snake = this.players[index];
            if (!snake.isPlaying) {
                continue;
            }
            //Updating current direction to next direction
            snake.updateCurrentDirection();
            //Creating new parts
            const head = Object.assign({}, snake.body[0]);
            if (snake.currentDirection.x < 0) {
                head.column--;
            } else if (snake.currentDirection.y < 0) {
                head.row--;
            } else if (snake.currentDirection.x > 0) {
                head.column++;
            } else {
                head.row++;
            }
            // erasing old snake
            snake.body.forEach((bodyPart) => this.display.draw({ row: bodyPart.row, column: bodyPart.column, color: "transparent" }));
            // adding new parts to the front
            snake.body.unshift(head);
            if (this.isIntersecting(snake)) {
                snake.body.shift();
                snake.isPlaying = false;
                //when snake dies erase it
                snake.body.forEach((bodyPart) => this.display.draw({ row: bodyPart.row, column: bodyPart.column, color: "transparent" }));
            } else {
                const snakeAteApple =
                    //Snake eat apple THEN grows and that why we check the position of second part
                    this.apple.tile.row === snake.body[1].row &&
                    this.apple.tile.column === snake.body[1].column;
                if (!snakeAteApple) {
                    //removing tail from the body array
                    snake.body.pop();
                } else {
                    snake.score++;
                    this.display.updateScore(index, snake.score)
                }
                // draw snake
                snake.body.forEach((bodyPart) => this.display.draw(bodyPart));
                if (snakeAteApple) {
                    // draw new apple
                    this.apple.setPosition(this.apple.generateRandomGrid(this.display.board.grid, this.players));
                    this.display.draw(this.apple.tile);
                }
            }
        }
        // when no player are "playing", game ends
        if (this.players.every((player) => player.isPlaying === false)){  
            clearInterval(intervalID);
            // so player can refresh the page with ctrl + R
            this.players.forEach((player) => player.deleteEventListener());
            this.display.showFinalScore(this.players.map((player) => [player.score, player.body[0].color]));
        }
    }
}
