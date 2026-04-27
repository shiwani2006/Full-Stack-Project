import React from "react";

const ProviderCard = ({ provider, onAction }) => {
  return (
    <div className="provider-card">
      <h4>{provider.name}</h4>
      <p>⭐ {provider.rating}</p>
      <p>₹{provider.price}</p>
      <p>{provider.available}</p>

      <div className="card-actions">
        <button onClick={() => onAction(`Book ${provider.name}`)}>
          Book
        </button>
        <button onClick={() => onAction(`Compare providers`)}>
          Compare
        </button>
      </div>
    </div>
  );
};

export default ProviderCard;