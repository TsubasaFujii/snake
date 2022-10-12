import Grid from "./grid.js";

export default class Apple {
    constructor (gridAmount, players){
        this.tile = new Grid(null, null, "#8DB600");
        this.setPosition(this.generateRandomGrid(gridAmount, players));
    }
    setPosition(newGrid) {
        this.tile.row = newGrid.row;
        this.tile.column = newGrid.column;
    };
    generateRandomGrid(gridAmount, players) {
        let randomRow;
        let randomColumn;
        let grid = gridAmount;
        // to avoid placing the apple on the snake's body
        do {
            randomRow = Math.floor(
                //Math.floor(Math.random() * (grid - 1 + 1) + 1) Note: getting grid not index number
                Math.random() * grid + 1
            );
            randomColumn = Math.floor(Math.random() * grid + 1);
        } while (
            players.some((snake) => {
                return snake.body.some((bodyPart) => bodyPart.row === randomRow && bodyPart.column === randomColumn)
            })
        );
        return new Grid(randomRow, randomColumn);
    };
}