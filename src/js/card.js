import React from 'react';

const Card = ({ value, suit }) => {
  const cardImage = `${value}_of_${suit}.png`;
  return (
    <img src={`../../assets/cards/${cardImage}`} alt={`${value} of ${suit}`} className="card" />
  );
};

export default Card;
