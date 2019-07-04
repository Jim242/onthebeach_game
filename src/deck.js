//Shuffle the array of cards
function shuffle(array) {
    const _array = array.slice(0)
    for( let i = 0; i < array.length - 1; i++) {
        let randomIndex = Math.floor(Math.random() * ( i + 1))
        let temp = _array[i]
        _array[i] = _array[randomIndex]
        _array[randomIndex] = temp
    }
    return _array
}

export default function initialiseDeck() {
    let id = 0
    // matches the public img
    const cards = ['sun', 'sandCastle', 'waves', 'towel', 'beachBall', 'sunscreen', 'lounger', 'suitcase']
    .reduce((acc, type) => {
        //Push to js cards into acc array so we can match the cards
        acc.push({
            id: id++,
            type
        })
        acc.push({
            id: id++,
            type
        })
        return acc
    }, [])

    return shuffle(cards)
}