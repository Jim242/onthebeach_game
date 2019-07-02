import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

// Destructure {} the props to gain instance access to them
export default function Card({
  handleClick,
  id,
  flipped,
  back,
  front,
  height,
  width
}) {
  return (
    <div
      className={`flip-container ${flipped ? "flipped" : ""}`}
      style={{
        width,
        height
      }}
      onClick={() => handleClick(id)}
    >
      <div className="flipper">
        <img
          className={flipped ? "front" : "back"}
          src={flipped ? front : back}
          style={{ width, height }}
        />
      </div>
    </div>
  );
}

Card.prototype = {
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  flipped: PropTypes.bool.isRequired,
  back: PropTypes.string.isRequired,
  front: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};
