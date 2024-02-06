import { gameBoard } from "./gameboard";
import { GameView } from "./view";
import { Player, Bot } from "./players";

class gameLoop{
    constructor(){
        this.dom = new GameView();
        this.player = new Player();
        this.bot = new Bot();
        this.loop();
    }

    async loop(){
        this.player = new Player();
        this.bot = new Bot();

        this.dom.chooseShip(this.player);
        while (!this.player.allShipsPlaced()) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.dom.chooseShip(this.player);
        }

        // Start game;
        
    }
}

const Game = new gameLoop();

Game.loop();