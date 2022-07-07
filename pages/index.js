import Game from '../components/Game.js';
import { gameFormSelector, resetButton } from '../utils/constants.js'

const game = new Game(gameFormSelector);
game.createGameField();

resetButton.addEventListener('click', () => {
  game.resetGameField();
})