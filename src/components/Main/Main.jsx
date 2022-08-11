import React from 'react'
import './Main.scss'

import GameField from '../GameField/GameField'
import Setting from '../GameSetting/Setting'

const Main = () => {
  return (
    <section className='game-area'>
      <h1 className='game-area__heading'>Knight's Tour Game</h1>
      
      <div className='game-area__fieldset'>
        <GameField size={10}/>
      </div>
      
      <div className='game-area__contol'>
        <Setting />
        <button className='button game-area__control-reset' type='button' id='reset' name='reset'>Reset</button>
      </div>
    </section>
  )
}

export default Main