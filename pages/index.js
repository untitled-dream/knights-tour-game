import KnightsTour from '../components/KnightsTour.js';
import { gameFormSelector, resetButton } from '../utils/constants.js'

const knightsTour = new KnightsTour(gameFormSelector);
knightsTour.createGameField();

resetButton.addEventListener('click', () => knightsTour.resetGameField())