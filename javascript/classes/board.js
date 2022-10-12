export default class Board {
    constructor (gameAreaElement) {
        this.grid = 10;
        this.small = 300;
        this.medium = 400;
        this.large = 500;
        this.drawBoard(gameAreaElement);
    }
    getBoardSideLength() {
        const shorterLength = Math.min(window.screen.availHeight, window.screen.availWidth);
        if (shorterLength < 600) {
            return this.small;
        } else if (shorterLength < 800) {
            return this.medium;
        } else {
            return this.large;
        }
    };
    drawBoard(gameAreaElement) {
        const side = this.getBoardSideLength();
        const grid = this.grid;
        // This is for when the window get resized when game isn't being played.
        if (gameAreaElement.hasChildNodes()) {
            gameAreaElement.innerHTML = "";
        }
        for (let i = 0; i < grid; i++) {
            const row = document.createElement("div");
            row.classList.add(`row${i + 1}`);
            row.style.height = `${side / grid}px`;
            for (let j = 0; j < grid; j++) {
            const tile = document.createElement("div");
            tile.classList.add(`column${j + 1}`, "tile");
            tile.style.width = `${side / grid}px`;
            row.append(tile);
            }
            gameAreaElement.append(row);
        }
    }
}