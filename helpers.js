function updateTable() {
  $('#table').html('')
  console.log("TABLE UPDATED")
  let players = JSON.parse(localStorage.getItem('players'))
  allCards.forEach(card => {
    let cardObj = JSON.parse(localStorage.getItem(card))

    let color = ''
    if (categories[card] == 'who')
        color = "red"
    if (categories[card] == 'what')
        color = "green"
    if (categories[card] == 'where')
        color = "blue"

    $('#table').append(`<h3 style="border-top: 2px solid ${color};">${card}: </h3>`)
    for (player in cardObj) {
        $('#table').append(`${players[player]}: `)
        if (cardObj[player] == '-1') {
            $('#table').append(`<span style="background-color: grey;">${cardObj[player]}</span>`)
        }
        else if (cardObj[player] == '0') {
            $('#table').append(`<span style="background-color: red;">${cardObj[player]}</span>`)
        }
        else {
            $('#table').append(`<span style="background-color: green;">${cardObj[player]}</span>`)
        }
        $('#table').append(', ')
    }
    $('#table').append(`<p style="border-bottom: 2px solid ${color};">`)
  })
  let culprit = JSON.parse(localStorage.getItem('culprit'))
  $('#table').append(`<h4 style="border-top: 2px solid gold">Culprit:</h4>`)
  culprit.forEach(card => {
      $('#table').append(`${card}, `)
  })
  $('#table').append(`<p style="border-top: 2px solid gold">`)
}

function change(card, player, value) {
    localCard = JSON.parse(localStorage.getItem(card))
    localCard[player] = value
    localStorage.setItem(card, JSON.stringify(localCard))
    updateTable()
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

let categories = {
  "green": "who",
  "mustard": "who",
  "peacock": "who",
  "plum": "who",
  "skarlet": "who",
  "white": "who",
  "wrench": "what",
  "candlestick": "what",
  "dagger": "what",
  "pistol": "what",
  "leadpipe": "what",
  "rope": "what",
  "bathroom": "where",
  "study": "where",
  "diningroom": "where",
  "gameroom": "where",
  "garage": "where",
  "bedroom": "where",
  "livingroom": "where",
  "kitchen": "where",
  "courtyard": "where"
}