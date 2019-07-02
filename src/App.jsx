import React, { useState, useEffect } from "react";
import Board from "./components/board";
import initialiseDeck from './deck';

export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);

  //similar to didMount
  useEffect(() => {
    setCards(initialiseDeck());
  //second argument, a value to watch to see if needs to be called again
  }, []);

  const handleClick = id => setFlipped([...flipped, id]);

  return (
    <div>
      <h1>Memory</h1>
      <h2>Can you remember where the cards are?</h2>
      <Board cards={cards} flipped={flipped} handleClick={handleClick} />
    </div>
  );
}
