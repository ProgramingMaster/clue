function addPlayer(name) {
  players.push(name)
}

function addYou(name) {
  you = name
  for (category in cards) {
    for (suspect in cards[category]) {
      players.forEach(player => {
        cards[category][suspect][player] = -1
      })
    }
  }
}