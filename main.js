class Ship{
    constructor(length){
        this.length = length;
        this.hitted = 0;

        this.startCoordinate = [];
        this.direction = null;
    }

    hit(){
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
        this.coordinate = coordinate;
        this.direction = direction;
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
}

let game = new Gameboard();

console.log(game.startShips().Carrier);
