export class GameView{
    chooseShip(player){
        const container = document.getElementById('app');
        container.innerHTML = ''

        const boardElement = document.createElement('div');
        boardElement.classList.add('board');

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');

                if(player.game.board[i][j].isShip){
                    cellElement.classList.add('ship');
                }
        
                cellElement.addEventListener('click', () =>{
                    if(player.placeShips([i,j])){
                        this.chooseShip(player);
                        return;
                    }
                    
                    console.log(player.game.board)
                })
                
                boardElement.appendChild(cellElement);
            }
        }

        container.appendChild(boardElement);
    }

    
}