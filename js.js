// killer: plum rope courtyard
// mom: mustard diningroom gameroom pistol
// dad: candlestick peacock study dagger
// quinn: green wrench skarlet kitchen
// chalesa: bathroom leadpipe bedroom garage
// middle: study white

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

let cards = {
"who": {
  "green": {},
  "mustard": {},
  "peacock": {},
  "plum": {},
  "skarlet": {},
  "white": {}
},
"what": {
  "wrench": {},
  "candlestick": {},
  "dagger": {},
  "pistol": {},
  "leadpipe": {},
  "rope": {}
},
"where": {
  "bathroom": {},
  "study": {},
  "diningroom": {},
  "gameroom": {},
  "garage": {},
  "bedroom": {},
  "livingroom": {},
  "kitchen": {},
  "courtyard": {}
}
}

let culprit = []

let guesses = []

numPlayers = 0;
you = 0;

start(4, 2, ["green", "wrench", "kitchen", "study", "white", "skarlet"])
addGuess(["mustard", "study", "dagger"], 0, 3)
addGuess(["mustard", "candlestick", "livingroom"], 1, 0)
yourTurn(["skarlet", "candlestick", "kitchen"], 1, "candlestick")
addGuess(["white", "dagger", "livingroom"], 3, 1)
nohelp(["plum", "rope", "courtyard"], 0)
nohelp(["plum", "rope", "courtyard"], 1)
checkifculprit("rope")
console.log(guesses)
console.log(cards)
console.log(culprit)

function nohelp(guess, guesser) {
  whodoesnt(guess, guesser, guesser)
}

function checkifculprit(card) {
  if (culprit.indexOf(card) != -1) {
    return true
  }

  cardObj = cards[categories[card]][card]
  found = false
  for (player in cardObj) {
    if (cardObj[player] != 0) {
      found = true
    }
  }
  if (!found) {
    culprit.push(card)
    return true
  }
}

function change(card, player, value) {
  cards[categories[card]][card][player] = value
}

function yourTurn(guess, helper, shown) {
  whodoesnt(guess, you, helper)
  change(shown, helper, 1)
}

function deduceGuesses() {
  let found = false;
  for (let i = 0; i < guesses.length; i++){
    if (crossout(guesses[i])) {
      guesses.splice(i, 1)
      found = true
      break
    }
  }
  if (found)
    deduceGuesses()
}

function couldShowerHaveCard(card, shower) {
  const cardObj = cards[categories[card.name]][card.name]
  for (player in cardObj) {
    if (cardObj[player] == 1 && player != shower) {
      return false
    }
    if (cardObj[player] == 0 && player == shower) {
      return false
    }
  }
  return true
}

// What was shown
function crossout(guess) {
  let blank = ""
  guess.guess.forEach(card => {
    if (card.crossedout) {
      return
    }
    if (!couldShowerHaveCard(card, guess.shower)) {
      card.crossedout = true
      return
    }

    if (blank.length > 0)
      blank = "-1"
    else
      blank = card.name
  })
  if (blank != "-1") {
    change(blank, guess.shower, 1)
    return true
  }
  return false
}

function whodoesnt(guess, guesser, shower) {
  let i = guesser+1
  while (i != shower) {
    if (i >= numPlayers){
      i = 0
      continue
    }
    if (i == you) {
      i++
      continue
    }
    for (let j = 0; j < 3; j++){
      change(guess[j], i, 0)
    }
    i++
  }
  deduceGuesses()
  guess.forEach(card => {
    checkifculprit(card)
  })
}

function addGuess(guess, guesser, shower) {
  whodoesnt(guess, guesser, shower)

  guessObj = {
    guess: guess.map(card => {
      return {
          name: card,
          crossedout: false
        }
    }),
    guesser: guesser,
    shower: shower
  }
  if (!crossout(guessObj)) {
    guesses.push(guessObj)
  }
  else {
    deduceGuesses()
  }
}

function start(n, y, knownCards) {
  numPlayers = n
  you = y
  for (category in cards) {
    for (suspect in cards[category]) {
      for (let i = 0; i < numPlayers; i++){
        if (i == you)
          cards[category][suspect][i] = 0
        else
          cards[category][suspect][i] = -1
      }
    }
  }
  knownCards.forEach(card => {
    change(card, you, 1)
  })
}
