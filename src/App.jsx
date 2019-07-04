import React, { useState, useEffect } from "react";
import Board from "./components/board";
import initialiseDeck from "./deck";

export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [dimension, setDimension] = useState(400);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  //Similar to didMount of react
  useEffect(() => {
    resizeBoard();
    setCards(initialiseDeck());
    //Second argument, a value to watch to see if needs to be called again
  }, []);

  useEffect(() => {
    preloadImages();
  }, cards)

  //The board will alter size dependant on the screen area of the user
  useEffect(() => {
    const resizeListener = window.addEventListener("resize", resizeBoard);
    return () => window.removeEventListener("resize", resizeListener);
  });

  /*The handle click will do alot of the heavy lifting
  First it will make the first clicked card disabled so it stays facing up
  As well as storing this in the flipped array props
  The second card is flipped and the two ids now in the flipped array are checked
  If the correct they stay disabled but cleared from the flipped array
  If incorrect match they are unDisabled and flipped back again*/
  const handleClick = id => {
    setDisabled(true);
    if (flipped.length === 0) {
      setFlipped([id]);
      setDisabled(false);
    } else {
      if (sameCardClicked(id)) return;
      setFlipped([flipped[0], id]);
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id]);
        resetCards();
      } else {
        setTimeout(resetCards, 1000);
      }
    }
  };

  //On the page load all of the images are preloaded to stop loading flashes when the cards are flipped
  const preloadImages = () => {
    cards.map(card => {
      const src = `/img/${card.type}.png`;
      new Image().src = src;
    });
  };

  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  };

  const sameCardClicked = id => flipped.includes(id);

  const isMatch = id => {
    const clickedCard = cards.find(card => card.id === id);
    const flippedCard = cards.find(card => flipped[0] === card.id);
    return flippedCard.type === clickedCard.type;
  };

  const resizeBoard = () => {
    setDimension(
      Math.min(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      )
    );
  };

  return (
    <div>
      <h1>Ready for the beach?</h1>
      <h2>Match all of the cards</h2>
      <Board
        dimension={dimension}
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled={disabled}
        solved={solved}
      />
    </div>
  );
}
