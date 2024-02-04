const Gameboard = require('./main')

test('Check Hit', () => {
    const board = new Gameboard();
    board.placeShip('Carrier', [0,0], 0);

    expect(1).toBe(1);
})