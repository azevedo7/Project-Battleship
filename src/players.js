import { gameBoard } from "./gameboard"

export class Player{
    constructor(){
        this.game = new gameBoard();
        this.unplaced = [5,4,3,3,2];
    }

    placeShips(coord){
        if(this.game.placeShip(this.unplaced[0], coord, 0)){
            this.unplaced.shift();
            return true;
        }
        return false;
    }

    allShipsPlaced(){
        if(this.unplaced.length == 0){ return true; }
        return false;
    }
}

export class Bot{
    constructor(){
        this.board = new Gameboard();
        this.populateBoard();
    }

    getRandomCoordinate() {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        return [x, y];
    }

    getRandomDirection() {
        return Math.random() < 0.5 ? 0 : 1; // 0 for horizontal, 1 for vertical
    }

    populateBoard() {
        for (const shipName in this.board.ships) {
            let placed = false;
            while (!placed) {
                const randomCoordinate = this.getRandomCoordinate();
                const randomDirection = this.getRandomDirection();

                
                if(this.board.placeShip(shipName, randomCoordinate, randomDirection) == true){
                    placed = true;
                };
            }
        }
    }
}