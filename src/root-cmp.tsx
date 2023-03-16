
import './main.scss';
import { gameService } from './game.service';
import { useEffect, useState } from 'react';



function App() {
  const [colors, setColors] = useState<string[]>([])
  const [currColor, setCurrColor] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const pressedColors = []



  useEffect(() => {
    startGame()
  }, [])

  useEffect(() => {
    showCurrColors()
  }, [colors])

  function startGame() {
    setIsPlaying(true)
    const color: string = gameService.getColor()
    console.log('color:', color)
    setColors([color])
  }

  function checkAnswer(val: string) {
    pressedColors.push(val)
    if (val !== colors[pressedColors.length - 1]) return failure()
    if (pressedColors.length === colors.length) {
      levelUp()
    }
  }

  function showCurrColors() {
    colors.forEach(color => {
      setTimeout(() => {
        setCurrColor(color)
      }, 1000)

    })
  }

  function failure() {
    console.log('YOU SUCK');
    setIsPlaying(false)
  }

  function levelUp() {
    const color = gameService.getColor()
    console.log('color:', color)
    setColors(prevState => [...prevState, color])
    console.log('YOU GREAT');

  }

  return <div className="app main-layout">
    <h1>The Simon Game</h1>
    <h1>{isPlaying ? `Score: ${colors.length - 1}` : `Wrong!, your score was ${colors.length - 1}`}</h1>
    {!isPlaying && <button onClick={startGame}>Restart</button>}
    <div className='simon-container'>
      <div className={`simon-square red ${currColor === 'red' ? 'curr-color' : ''}`} onClick={() => checkAnswer('red')}></div>
      <div className={`simon-square green ${currColor === 'red' ? 'curr-color' : ''}`} onClick={() => checkAnswer('green')}></div>
      <div className={`simon-square blue ${currColor === 'red' ? 'curr-color' : ''}`} onClick={() => checkAnswer('blue')}></div>
      <div className={`simon-square yellow ${currColor === 'red' ? 'curr-color' : ''}`} onClick={() => checkAnswer('yellow')}></div>
    </div>
  </div>

}

export default App;
