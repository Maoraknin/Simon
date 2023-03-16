import { Color } from '../interfaces/Color'

export const gameService = {
    getColor
}

const colors: Color[] = [
    { name: 'green', sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3') },
    { name: 'red', sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3') },
    { name: 'yellow', sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3') },
    { name: 'blue', sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3') },
  ]

function getColor() {
    return colors[Math.floor(Math.random() * 4)]
}