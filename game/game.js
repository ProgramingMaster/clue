players = JSON.parse(localStorage.getItem('players'))
numPlayers = Number(localStorage.getItem('numPlayers'))
you = Number(localStorage.getItem('you'))

function populate(selector) {
    players.forEach(player => {
        $(selector).append(`<option value="${players.indexOf(player)}">${player}</option>`)
    })
}
populate('#guesser')
populate('#helper')
populate('#player')
updateTable()

function manual(card, player, value) {
  if (value == 'culprit') {
    let culprit = JSON.parse(localStorage.getItem('culprit'))
    culprit.push(card)
    localStorage.setItem('culprit', JSON.stringify(culprit))
    updateTable()
    return
  }
  change(card, Number(player), Number(value))
}

function guess(guesser, guess, helper, shown = false) {
  guesser = Number(guesser)
  if (guesser == you) {
    if (helper == "nohelp") {
      console.log(":)")
      whodoesnt(you, guess, you)
      return
    }
    helper = Number(helper)
    whodoesnt(you, guess, helper)
    change(shown, helper, 1)
    return
  }
  if (helper == "nohelp") {
    whodoesnt(guesser, guess, guesser)
    return
  }
  helper = Number(helper)
  whodoesnt(guesser, guess, helper)
  if (shown) {
    change(shown, helper, 1)
    return
  }
  let guessObj = {
    guesser: guesser,
    guess: guess.map(card => {
        return {
          name: card,
          crossedout: false
        }
      }),
    helper: helper
  }
  let cross = crossout(guessObj)

  if (!cross[0]) {
    if (cross[1].length > 0) {
      guessObj["guess"].forEach(card => {
        if (cross[1].indexOf(card.name) != -1) {
          card.crossedout = true
        }
      })
    }
    addGuess(guessObj)
  }
  else {
    console.log(":)")
    deduceGuesses()
  }
}

function deduceGuesses() {
  let found = false;
  let guesses = JSON.parse(localStorage.getItem('guesses'))
  for (let i = 0; i < guesses.length; i++){
    let cross = crossout(guesses[i])
  
    if (cross[0]) {
      guesses.splice(i, 1)
      found = true
      break
    }
    if (cross[1].length > 0) {
      guesses[i]["guess"].forEach(card => {
        if (cross[1].indexOf(card.name) != -1) {
          card.crossedout = true
        }
      })
    }
  }
  localStorage.setItem('guesses', JSON.stringify(guesses))
  if (found)
    deduceGuesses()
}

function whodoesnt(guesser, guess, helper) {
  let i = guesser+1
  while (i != helper) {
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

function crossout(guess) {
  let blank = ""
  let crossedout = []
  guess.guess.forEach(card => {
    if (card.crossedout) {
      return
    }
    if (!couldHelperHaveCard(card.name, guess.helper)) {
      card.crossedout = true
      crossedout.push(card)
      return
    }
  
    if (blank.length > 0)
      blank = "-1"
    else
      blank = card.name
  })
  if (blank != "-1") {
    change(blank, guess.helper, 1)
    return [true, crossedout]
  }
  return [false, crossedout]
}

function couldHelperHaveCard(card, helper) {
  const cardObj = JSON.parse(localStorage.getItem(card))
  for (player in cardObj) {
    if (cardObj[player] == 1 && player != helper) {
      return false
    }
    if (cardObj[player] == 0 && player == helper) {
      return false
    }
  }
  return true
}

function checkifculprit(card) {
  let culprit = JSON.parse(localStorage.getItem('culprit'))
  if (culprit.indexOf(card) != -1) {
    return true
  }

  let cardObj = JSON.parse(localStorage.getItem(card))
  found = false
  for (player in cardObj) {
    if (cardObj[player] != 0) {
      found = true
    }
  }
  if (!found) {
    culprit.push(card)
    localStorage.setItem('culprit', JSON.stringify(culprit))
    updateTable()
    return true
  }
}
