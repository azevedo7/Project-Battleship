import { Ship } from './ship'

export class gameBoard{
    constructor(){
        this.board = this.createBoard();
    }

    createBoard(){
        let board = new Array(10);

        for(let i = 0; i < 10; i++){
            board[i] = new Array(10);
            for(let k = 0; k < 10; k++){
               board[i][k] = {hit: 0, isShip: 0};
            }
        }
        return board;
    }

    placeShip(length, coordinate, direction){
        const ship = new Ship(length)

        // Handle errors

        // Validate direction
        if (direction !== 0 && direction !== 1) {
            console.error("Invalid direction. Direction must be 0 (horizontal) or 1 (vertical).");
            return; // Do nothing if direction is invalid
        }

        // Validate coordinate boundaries
        if (coordinate[0] < 0 || coordinate[0] >= 10 || coordinate[1] < 0 || coordinate[1] >= 10) {
            console.error("Invalid coordinates. Coordinates must be within the 10x10 board.");
            return; // Do nothing if coordinates are out of bounds
        }

        // Calculate the end coordinate based on ship length and direction
        const endCoordinate = [
            coordinate[0] + (direction === 0 ? length - 1 : 0),
            coordinate[1] + (direction === 1 ? length - 1 : 0)
        ];

        // Validate ship placement boundaries
        if (endCoordinate[0] >= 10 || endCoordinate[1] >= 10) {
            console.error("Invalid ship placement. Ship goes beyond the board boundaries.");
            return; // Do nothing if ship placement is out of bounds
        }

        let newCoordinates = this.calcCoordinates(coordinate, length, direction);
        // Update board
        newCoordinates.forEach((coord) =>{
            const [x,y] = coord;
            this.board[x][y].isShip = ship;
        })

        return true
    }

    calcCoordinates(start, length, direction){
        let coordinates = [];
        let x = start[0];
        let y = start[1];
        for(let i = 0; i < length; i++){
            if(direction == 0){
                coordinates.push([x+i, y])
            } else {
                coordinates.push([x, y+i])
            }
        }
        return coordinates;
    }

    receiveAttack(coord){
        const [x,y] = coord;
        if(this.board[x][y].hit == 0){
            this.board[x][y].hit = 1;
            if(this.board[x][y].isShip != 0){
                this.board[x][y].isShip.hit();
            }
        }
    }

    gameOver(){
        let counter = 0;
        for(let i = 0; i<10; i++){
            for(let k=0; k<10; k++){
                if (this.board[i][k].isShip !== 0 && !this.board[i][k].isShip.isSunk()) {
                    return false; // At least one ship is not sunk
                }
            }
        }
        return true;
    }
    
}

