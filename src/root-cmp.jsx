
import './main.scss';
import { gameService } from './game.service';
import { useEffect, useState } from 'react';



function App() {
  const [colors, setColors] = useState([])
  const pressedColors = []

  useEffect(() => {
    startGame() 
}, [])

function startGame(){
  const color = gameService.getColor()
  console.log('color:',color)
  setColors(prevState => [...prevState, color])
}

function checkAnswer(val){
  pressedColors.push(val)
  if(val !== colors[pressedColors.length - 1]) return failure()
  if(pressedColors.length === colors.length){
    levelUp()
  }
}

function failure(){
  console.log('YOU SUCK');
}

function levelUp(){
  startGame()
  console.log('YOU GREAT');

}

  return <div className="app main-layout">
      <h1>The Simon Game</h1>
      <button onClick={startGame}>Start Game</button>
      <div className='simon-container'>
        <div className='simon-square red' onClick={() => checkAnswer('red')}></div>
        <div className='simon-square green' onClick={() => checkAnswer('green')}></div>
        <div className='simon-square blue' onClick={() => checkAnswer('blue')}></div>
        <div className='simon-square yellow' onClick={() => checkAnswer('yellow')}></div>
      </div>
    </div>
  
}

export default App;
