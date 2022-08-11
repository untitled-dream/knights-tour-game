import { createElement } from 'react'

const GameField = ({ size}) => {

  const fieldset = [];

  for (let y = 1; y <= size; y++) {
    for (let x = 1; x <= size; x++) {
      let cell = createElement('button', { id: `${x},${y}`, type: 'button', className: 'game-area__cell', key: `${x},${y}` })
      fieldset.push(cell)
    }
  }

  return (
    <>
      {fieldset}
    </>
  )
}

export default GameField

/*
<template id='cell-template'>
  
</template>


for (let y = 1; y <= 10; y++) {
      for (let x = 1; x <= 10; x++) {
        const gameElement = this._getElement(x, y);
        this._renderElement(gameElement);
      }
    }

*/