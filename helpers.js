function change(card, player, value) {
    console.log(card)
    localCard = JSON.parse(localStorage.getItem(card))
    localCard[player] = value
    localStorage.setItem(card, JSON.stringify(localCard))
}

function addGuess(guessObj) {
    let guesses = JSON.parse(localStorage.getItem('guesses'))
    guesses.push(guessObj)
    localStorage.setItem('guesses', JSON.stringify(guesses))
}

function getCards() {
    numPlayers = localStorage.getItem(numPlayers)
    let guesses = {}
    allCards.forEach(card => {
        guesses[card] = JSON.parse(localStorage.getItem(card))
    })
    return guesses
}



let allCards = [
    "green",
    "mustard",
    "peacock",
    "plum",
    "skarlet",
    "white",
    "wrench",
    "candlestick",
    "dagger",
    "pistol",
    "leadpipe",
    "rope",
    "bathroom",
    "study",
    "diningroom",
    "gameroom",
    "garage",
    "bedroom",
    "livingroom",
    "kitchen",
    "courtyard",
]