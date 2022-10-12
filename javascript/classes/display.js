import Board from "./board.js";

export default class Display {
    constructor (){
        this.gameAreaElement = document.querySelector("#board");
        this.viewportOverlay = document.querySelector("#viewportOverlay");
        this.buttonSinglePlayer = document.querySelector("#buttonSinglePlayer");
        this.buttonTwoPlayer = document.querySelector("#buttonTwoPlayer");
        this.h1 = document.querySelector("h1");
        this.messageText = document.querySelector("#message > p");
        this.messagePopUp = document.querySelector("#message");
        this.main = document.querySelector("main");
        this.scoreBoard = document.querySelector(".score");
        this.scoreOuterFirstPlayer = document.querySelector(".first-player");
        this.scoreFirstPlayer = document.querySelector(".first-player > strong");

        this.board = new Board(this.gameAreaElement);
        this.adjustScoreBoard();
        this.adjuster = this.adjustLayout.bind(this);

        //Set up board, re-set up gets triggered when the player resizes the window when not playing
        window.addEventListener("resize", this.adjuster, true);
    }
    /* draw, in other words to change the background color of a tile */
    draw(grid) {
        const targetTile = document.querySelector(
            `div.row${grid.row} > div.column${grid.column}`
        );
        targetTile.style.backgroundColor = grid.color;
    }
    adjustLayout() {
        // start button is shown only before the game starts
        if (!this.buttonSinglePlayer.classList.contains("hidden")) {
            this.board.drawBoard(this.gameAreaElement);
            this.adjustScoreBoard();
        }
        return;
    }
    disableAdjuster() {
        window.removeEventListener("resize", this.adjuster, true);
    }
    // this is to adjust the position of the score board
    adjustScoreBoard(){
        const narrowScreen = window.screen.availHeight > window.screen.availWidth;
            if (narrowScreen){
                this.main.classList.remove("main-layout-wide");
                this.main.classList.add("main-layout-narrow");
                this.scoreBoard.classList.add("score-layout-narrow");
            }else {
                this.scoreBoard.classList.remove("score-layout-narrow");
                this.main.classList.remove("main-layout-narrow");
                this.main.classList.add("main-layout-wide");
            }
    }
    createSecondPlayerScoreBoard(){
        //Score for 2nd player. It will be added after proportion/player is set. 
        const div = document.createElement("div");
        div.classList.add("second-player");
        div.innerHTML = "Your score<br>";
        const strong = document.createElement("strong");
        strong.style.color = "blue";
        strong.textContent = "0";
        div.append(strong)

        this.scoreFirstPlayer.style.color = "red";

        const narrowScreen = window.screen.availHeight > window.screen.availWidth;
        if (narrowScreen) {
            this.scoreBoard.insertBefore(div, this.scoreOuterFirstPlayer);
        }else {
            const outer = document.createElement("div");
            outer.classList.add("score");
            outer.append(div);
            this.main.insertBefore(outer, this.gameAreaElement);
        }
        this.scoreSecondPlayer = document.querySelector(".second-player > strong");
    }
    updateScore(indexNr, score){
        switch (indexNr){
            case 0:
                this.scoreFirstPlayer.textContent = `${score}`;
                break;
            case 1:
                this.scoreSecondPlayer.textContent = `${score}`;
                break;
        }
    }
    showFinalScore(scoreArray) {
        this.buttonSinglePlayer.remove();
        this.buttonTwoPlayer.remove();
        //Don't remove because it will be title less webpage
        this.h1.classList.add("hidden");

        // game over will be shown in exactly same style but not as h1 as it's not a title.
        const gameOver = document.createElement("div");
        gameOver.classList.add("heading");
        gameOver.innerHTML = "Game<br>Over";
        this.messagePopUp.insertBefore(gameOver, this.messageText);

        // scoreArray [[score, color], [score, color]]
        switch (scoreArray.length) {
            case 1:
                this.messageText.innerHTML = `Your score is ${scoreArray[0][0]} <br><br> <small>Refresh to replay</small>`;
                break;
            case 2:
                const winner = () => {
                    if (scoreArray[0][0] > scoreArray[1][0]){
                        return [`Congratulations <span class="player">Player One</span> <br>You won!`, 0];
                    } else if (scoreArray[0][0] < scoreArray[1][0]){
                        return [`Congratulations <span class="player">Player Two</span> <br>You won!`, 1];
                    }else {
                        return ["Draw!"];
                    }
                }
                this.messageText.innerHTML = `${winner()[0]}<br><br><small>Refresh to replay</small>`;
                const player = document.querySelector(".player");
                if (winner().length === 2) player.style.color = scoreArray[winner()[1]][1];
                break;
        }
        this.viewportOverlay.classList.remove("hidden");
        this.messagePopUp.classList.remove("hidden");
    }
}
