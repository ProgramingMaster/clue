/* who: {
  green: {mom: 0, quinn: 0, chalesa: 1, dad: 0} -> chalesa has it
  plum: {mom: 0, quinn: 0, chalesa: 0, dad: -1} -> dad might have it (or plum's the killer)
  skarlet: {mom: 0, quinn: 0, chalesa: 0, dad: 0} -> skarlets the killer
}*/
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
// [{guess: ["plum", "dagger", "garage"], guesser: "mom", shower: "quinn"}]
let guesses = []


// config variables

let players = []

let you = ""
