import Game from "./classes/game.js";
import Display from "./classes/display.js";

const display = new Display();

buttonSinglePlayer.addEventListener("click", () => {
    // hide message popup and overlay
    display.messagePopUp.classList.add("hidden");
    display.viewportOverlay.classList.add("hidden");
    const game = new Game(1, display);
    display.disableAdjuster();
    // start game loop
    play(game);
});
buttonTwoPlayer.addEventListener("click", () => {
    display.messagePopUp.classList.add("hidden");
    display.viewportOverlay.classList.add("hidden");
    display.disableAdjuster();
    display.createSecondPlayerScoreBoard();
    const game = new Game(2, display);
    play(game);
});
function play(game) {
    const intervalID = setInterval(() => {
        game.update(intervalID);
    }, 500);
}


