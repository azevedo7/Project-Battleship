/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gameBoard: () => (/* binding */ gameBoard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\r\n\r\nclass gameBoard{\r\n    constructor(){\r\n        this.board = this.createBoard();\r\n    }\r\n\r\n    createBoard(){\r\n        let board = new Array(10);\r\n\r\n        for(let i = 0; i < 10; i++){\r\n            board[i] = new Array(10);\r\n            for(let k = 0; k < 10; k++){\r\n               board[i][k] = {hit: 0, isShip: 0};\r\n            }\r\n        }\r\n        return board;\r\n    }\r\n\r\n    placeShip(length, coordinate, direction){\r\n        const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(length)\r\n\r\n        // Handle errors\r\n\r\n        // Validate direction\r\n        if (direction !== 0 && direction !== 1) {\r\n            console.error(\"Invalid direction. Direction must be 0 (horizontal) or 1 (vertical).\");\r\n            return; // Do nothing if direction is invalid\r\n        }\r\n\r\n        // Validate coordinate boundaries\r\n        if (coordinate[0] < 0 || coordinate[0] >= 10 || coordinate[1] < 0 || coordinate[1] >= 10) {\r\n            console.error(\"Invalid coordinates. Coordinates must be within the 10x10 board.\");\r\n            return; // Do nothing if coordinates are out of bounds\r\n        }\r\n\r\n        // Calculate the end coordinate based on ship length and direction\r\n        const endCoordinate = [\r\n            coordinate[0] + (direction === 0 ? length - 1 : 0),\r\n            coordinate[1] + (direction === 1 ? length - 1 : 0)\r\n        ];\r\n\r\n        // Validate ship placement boundaries\r\n        if (endCoordinate[0] >= 10 || endCoordinate[1] >= 10) {\r\n            console.error(\"Invalid ship placement. Ship goes beyond the board boundaries.\");\r\n            return; // Do nothing if ship placement is out of bounds\r\n        }\r\n\r\n        let newCoordinates = this.calcCoordinates(coordinate, length, direction);\r\n        // Update board\r\n        newCoordinates.forEach((coord) =>{\r\n            const [x,y] = coord;\r\n            this.board[x][y].isShip = ship;\r\n        })\r\n\r\n        return true\r\n    }\r\n\r\n    calcCoordinates(start, length, direction){\r\n        let coordinates = [];\r\n        let x = start[0];\r\n        let y = start[1];\r\n        for(let i = 0; i < length; i++){\r\n            if(direction == 0){\r\n                coordinates.push([x+i, y])\r\n            } else {\r\n                coordinates.push([x, y+i])\r\n            }\r\n        }\r\n        return coordinates;\r\n    }\r\n\r\n    receiveAttack(coord){\r\n        const [x,y] = coord;\r\n        if(this.board[x][y].hit == 0){\r\n            this.board[x][y].hit = 1;\r\n            if(this.board[x][y].isShip != 0){\r\n                this.board[x][y].isShip.hit();\r\n            }\r\n        }\r\n    }\r\n\r\n    gameOver(){\r\n        let counter = 0;\r\n        for(let i = 0; i<10; i++){\r\n            for(let k=0; k<10; k++){\r\n                if (this.board[i][k].isShip !== 0 && !this.board[i][k].isShip.isSunk()) {\r\n                    return false; // At least one ship is not sunk\r\n                }\r\n            }\r\n        }\r\n        return true;\r\n    }\r\n    \r\n}\r\n\r\n\n\n//# sourceURL=webpack://project-battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ \"./src/view.js\");\n/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./players */ \"./src/players.js\");\n\r\n\r\n\r\n\r\nclass gameLoop{\r\n    constructor(){\r\n        this.dom = new _view__WEBPACK_IMPORTED_MODULE_1__.GameView();\r\n        this.player = new _players__WEBPACK_IMPORTED_MODULE_2__.Player();\r\n        this.bot = new _players__WEBPACK_IMPORTED_MODULE_2__.Bot();\r\n        this.loop();\r\n    }\r\n\r\n    async loop(){\r\n        this.player = new _players__WEBPACK_IMPORTED_MODULE_2__.Player();\r\n        this.bot = new _players__WEBPACK_IMPORTED_MODULE_2__.Bot();\r\n\r\n        this.dom.chooseShip(this.player);\r\n        while (!this.player.allShipsPlaced()) {\r\n            await new Promise(resolve => setTimeout(resolve, 1000));\r\n            this.dom.chooseShip(this.player);\r\n        }\r\n\r\n        // Start game;\r\n        \r\n    }\r\n}\r\n\r\nconst Game = new gameLoop();\r\n\r\nGame.loop();\n\n//# sourceURL=webpack://project-battleship/./src/main.js?");

/***/ }),

/***/ "./src/players.js":
/*!************************!*\
  !*** ./src/players.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Bot: () => (/* binding */ Bot),\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\r\n\r\nclass Player{\r\n    constructor(){\r\n        this.game = new _gameboard__WEBPACK_IMPORTED_MODULE_0__.gameBoard();\r\n        this.unplaced = [5,4,3,3,2];\r\n    }\r\n\r\n    placeShips(coord){\r\n        if(this.game.placeShip(this.unplaced[0], coord, 0)){\r\n            this.unplaced.shift();\r\n            return true;\r\n        }\r\n        return false;\r\n    }\r\n\r\n    allShipsPlaced(){\r\n        if(this.unplaced.length == 0){ return true; }\r\n        return false;\r\n    }\r\n}\r\n\r\nclass Bot{\r\n    constructor(){\r\n        this.board = new Gameboard();\r\n        this.populateBoard();\r\n    }\r\n\r\n    getRandomCoordinate() {\r\n        const x = Math.floor(Math.random() * 10);\r\n        const y = Math.floor(Math.random() * 10);\r\n        return [x, y];\r\n    }\r\n\r\n    getRandomDirection() {\r\n        return Math.random() < 0.5 ? 0 : 1; // 0 for horizontal, 1 for vertical\r\n    }\r\n\r\n    populateBoard() {\r\n        for (const shipName in this.board.ships) {\r\n            let placed = false;\r\n            while (!placed) {\r\n                const randomCoordinate = this.getRandomCoordinate();\r\n                const randomDirection = this.getRandomDirection();\r\n\r\n                \r\n                if(this.board.placeShip(shipName, randomCoordinate, randomDirection) == true){\r\n                    placed = true;\r\n                };\r\n            }\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://project-battleship/./src/players.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship{\r\n    constructor(size){\r\n        this.size = size;\r\n        this.hits = 0;\r\n    }\r\n\r\n    hit(){\r\n        this.hits++;\r\n    }\r\n\r\n    isSunk(){\r\n        return this.hits>=this.size;\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack://project-battleship/./src/ship.js?");

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameView: () => (/* binding */ GameView)\n/* harmony export */ });\nclass GameView{\r\n    chooseShip(player){\r\n        const container = document.getElementById('app');\r\n        container.innerHTML = ''\r\n\r\n        const boardElement = document.createElement('div');\r\n        boardElement.classList.add('board');\r\n\r\n        for (let i = 0; i < 10; i++) {\r\n            for (let j = 0; j < 10; j++) {\r\n                const cellElement = document.createElement('div');\r\n                cellElement.classList.add('cell');\r\n\r\n                if(player.game.board[i][j].isShip){\r\n                    cellElement.classList.add('ship');\r\n                }\r\n        \r\n                cellElement.addEventListener('click', () =>{\r\n                    if(player.placeShips([i,j])){\r\n                        this.chooseShip(player);\r\n                        return;\r\n                    }\r\n                    \r\n                    console.log(player.game.board)\r\n                })\r\n                \r\n                boardElement.appendChild(cellElement);\r\n            }\r\n        }\r\n\r\n        container.appendChild(boardElement);\r\n    }\r\n\r\n    \r\n}\n\n//# sourceURL=webpack://project-battleship/./src/view.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;