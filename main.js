
class Ship{
    constructor(length){
        this.length = length;
        this.hitted = 0;

        this.startCoordinate = [];
        this.direction = null;
        this.coordinates = [];
        this.hitCoordinates = [];
    }

    hit(c){
        this.hitCoordinates.push(c);
        this.hitted++;
    }

    isSunk(){
        if(this.hitted == this.length){
            return true;
        }
        return false;
    }

    // Direction - Horizontal(0) Vertical(1)
    place(coordinate, direction){
        this.startCoordinate = coordinate;
        this.direction = direction;
        this.coordinates = this.calcCoordinates(coordinate, direction);
    }

    calcCoordinates(start, direction){
        let coordinates = [];
        let x = start[0];
        let y = start[1];
        for(let i = 0; i < this.length; i++){
            if(direction == 0){
                coordinates.push([x+i, y])
            } else {
                coordinates.push([x, y+i])
            }
        }
        return coordinates;
    }
}

class Gameboard{
    constructor(){
        this.board = this.startBoard();
        this.ships = this.startShips();
    }

    startBoard(){
        return Array.from({ length: 10 }, () => Array(10).fill(0));
    }

    startShips(){
        return {
            'Carrier': new Ship(5),
            'Battleship': new Ship(4),
            'Cruiser': new Ship(3),
            'Submarine': new Ship(3),
            'Destroyer': new Ship(2),
        }
    }

    placeShip(name, coordinate, direction){
        const ship = this.ships[name];

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
            coordinate[0] + (direction === 0 ? ship.length - 1 : 0),
            coordinate[1] + (direction === 1 ? ship.length - 1 : 0)
        ];

        // Validate ship placement boundaries
        if (endCoordinate[0] >= 10 || endCoordinate[1] >= 10) {
            console.error("Invalid ship placement. Ship goes beyond the board boundaries.");
            return; // Do nothing if ship placement is out of bounds
        }

        let newCoordinates = ship.calcCoordinates(coordinate, direction);

        // Check for overlap with existing ships

        for (const existingShipName in this.ships) {
            if (existingShipName !== name) {
                const existingShip = this.ships[existingShipName];
                for (const existingCoordinates of existingShip.coordinates) {
                    for (const coordinates of newCoordinates) {
                        if (
                            existingCoordinates[0] === coordinates[0] &&
                            existingCoordinates[1] === coordinates[1]
                        ) {
                            console.error("Invalid ship placement. Ships cannot overlap.");
                            return; // Do nothing if ships overlap
                        }
                    }
                }
            }
        }

        ship.place(coordinate, direction);
        return true
    }

    allPlaced() {
        let notPlaced = []
        for (const shipName in this.ships) {
            const ship = this.ships[shipName];
            if (ship.coordinates.length === 0) {
                notPlaced.push(shipName);
            }
        }
        if(notPlaced.length != 0){
            console.log("These ships are not placed: " + notPlaced.join(', '));
            return false;
        }
        return true; // All ships have been placed
    }

    receiveAttack(cord){
        if(this.board[cord[0]][cord[1]] == 0){
            this.board[cord[0]][cord[1]] = 1;
        }

        for(const [name, ship] of Object.entries(this.ships)){
            for (const coordinates of ship.coordinates) {
                if(coordinates[0] == cord[0] && coordinates[1] == cord[1]){
                    ship.hit(cord);
                    return;
                }
            }
        }
    }

    gameOver(){
        for(const [name, ship] of Object.entries(this.ships)){
            if(ship.hitted != ship.length) { return false;}
        }
        return true;
    }
}

class Player{
    constructor(){
        this.board = new Gameboard();
    }
}

class Bot{
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

function gameLoop(){
    const player = new Player();
    const pc = new Bot();
    let turn = 0;  // 0 - Player 1 - Computer
    drawBoard(pc.board, 'gameBoard');

    

}

function drawBoard(gameboard, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
  
    const boardElement = document.createElement('div');
    boardElement.classList.add('board');
  
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');

        // Check for ship on this cell
        for (const [name, ship] of Object.entries(gameboard.ships)) {
          if (ship.coordinates.some(([x, y]) => x === j && y === i)) {
            if (gameboard.board[i][j] === 1) {
                cellElement.classList.add('hit');
            }
            break; // Only mark first ship found (overlapping ships)
          }
        }
  
        // Display 'X' for hits (optional)
        if (gameboard.board[i][j] === 1) {
            cellElement.textContent = 'X';
          }
  
        boardElement.appendChild(cellElement);
      }
    }
  
    container.appendChild(boardElement);
  }
  

// let board = new Gameboard();

// board.placeShip('Carrier', [5,0], 0);
// board.placeShip('Cruiser', [5,1], 1)
// board.receiveAttack([5,0]);
// board.allPlaced();

gameLoop();