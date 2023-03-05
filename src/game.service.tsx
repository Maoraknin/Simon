
export const gameService = {
    getColor
}

const gColors = ['red', 'green', 'blue', 'yellow']

function getColor() {
    return gColors[Math.floor(Math.random() * 4)]
}