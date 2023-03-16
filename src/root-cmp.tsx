
import './main.scss';
import { gameService } from './game.service';
import { useEffect, useState, useRef } from 'react';
import { Color } from '../interfaces/Color'
import { utilService } from './services/util.service'



const WRONG_SOUND = new Audio('https://res.cloudinary.com/dsperrtyj/video/upload/v1677759437/wrong_xyf7uj.wav')
const CORRECT_SOUND = new Audio('https://res.cloudinary.com/dsperrtyj/video/upload/v1677759436/correct_ranvto.wav')
const NEW_SCORE_SOUND = new Audio('https://res.cloudinary.com/dsperrtyj/video/upload/v1677796731/new-score2_irvwx9.wav')

function App() {
  const [colors, setColors] = useState<Color[]>([])
  const [currColor, setCurrColor] = useState<Color | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const gameBoardRef = useRef<HTMLDivElement>(null)
  const pressedColors = []



  useEffect(() => {
    startGame()
  }, [])

  useEffect(() => {
    highlightSequence()
  }, [colors])

  function startGame() {
    setIsPlaying(true)
    const color: Color = gameService.getColor()
    console.log('color:', color)
    setColors([color])
  }

  function checkAnswer(val: string) {
    pressedColors.push(val)
    if (val !== colors[pressedColors.length - 1].name){
      playSound(WRONG_SOUND)
      return failure()
    }
    if (pressedColors.length === colors.length) {
      levelUp()
    }
  }

  function playSound(audioEl: HTMLAudioElement) {
    audioEl.currentTime = 0
    audioEl.volume = 0.1
    audioEl.play()
}

async function highlightSequence() {
  for (let i = 0; i < colors.length; i++) {
      const color = colors[i]
      await utilService.delay(i === 0 ? 1000 : 300)
      await hilghlightColor(color)
  }
  // setIsPlayerMove(true)
}

async function hilghlightColor(color: Color) {
  gameBoardRef.current?.classList.add(color.name)
  playSound(color.sound)
  await utilService.delay(500)
  gameBoardRef.current?.classList.remove(color.name)
}

  function failure() {
    console.log('YOU SUCK');
    setIsPlaying(false)
  }

  function levelUp() {
    const color = gameService.getColor()
    playSound(CORRECT_SOUND)
    console.log('color:',color)
    setColors(prevState => [...prevState, color])
    

  }

  return <div className="app main-layout">
    <h1>The Simon Game</h1>
    <h1>{isPlaying ? `Score: ${colors.length - 1}` : `Wrong!, your score was ${colors.length - 1}`}</h1>
    {!isPlaying && <button onClick={startGame}>Restart</button>}
    <div className='simon-container' ref={gameBoardRef}>
      <div className={`simon-square red`} onClick={() => checkAnswer('red')}></div>
      <div className={`simon-square green`} onClick={() => checkAnswer('green')}></div>
      <div className={`simon-square blue`} onClick={() => checkAnswer('blue')}></div>
      <div className={`simon-square yellow`} onClick={() => checkAnswer('yellow')}></div>
    </div>
  </div>

}

export default App;
