numPlayers = 0
players = []
you = 0

function addPlayer(name) {
    players.push(name)
    $('#players').append(name + ", ")
    $('#youButton').removeAttr("disabled");
    $('#playersForm').trigger("reset");
}

function addYou(name) {
    you = players.indexOf(name)
    numPlayers = players.length
    localStorage.setItem('you', you)
    localStorage.setItem('numPlayers', numPlayers)
    localStorage.setItem('players', JSON.stringify(players))

    init()
    $('#cardButton').removeAttr("disabled");
    $('#addButton').prop("disabled", true);
    $('#youButton').prop("disabled", true);
}

function addCard(card) {
    for (let i = 0; i < numPlayers; i++) {
        if (i === you) 
            change(card, you, 1)
        else
            change(card, i, 0)
    }
    $('#cardShower').append(card + ", ")
}

function change(card, player, value) {
    localCard = JSON.parse(localStorage.getItem(card))
    localCard[player] = value
    console.log(localCard)
    localStorage.setItem(card, JSON.stringify(localCard))
}

function init() {
    allCards.forEach(card => {
        let obj = {}
        for (let i = 0; i < numPlayers; i++) {
            if (i === you) {
                obj[i] = 0
                continue
            }
            obj[i] = -1
        }
        localStorage.setItem(card, JSON.stringify(obj))
    })
    localStorage.setItem('guesses', '[]')
    localStorage.setItem('culprit', '[]')
}
