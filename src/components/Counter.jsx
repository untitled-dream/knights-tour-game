import { useState } from 'react'
import './Counter.scss'

import { IconContext } from "react-icons";
import { HiPlusSm, HiMinusSm } from 'react-icons/hi'

const Counter = () => {

  const [counter, SetCounter] = useState(10)

  const increase = () => {
    if (counter < 15) {
      SetCounter(count => count + 1);
    }
  };

  const decrease = () => {
    if (counter > 5) {
      SetCounter(count => count - 1);
    }
  };

  return (
    <div className='counter'>
      <label className='counter__title'>Field Size</label>
      <div className='counter__wrapper'>
        <IconContext.Provider value={{ size: '25' }}>
          <button className='button counter__button' id='decrement' onClick={decrease}><HiMinusSm /></button>
          <input type='number' className='counter__input' value={counter} onChange={SetCounter} />
          <button className='button counter__button' id='increment' onClick={increase}><HiPlusSm /></button>
        </IconContext.Provider>
      </div>
    </div>
  )
}

export default Counter