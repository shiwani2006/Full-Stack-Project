import React from "react";

const suggestions = [
  "Find plumber",
  "Compare electricians",
  "Book cleaning service",
  "Wallet help",
  "Support"
];

const SuggestionCards = ({ onSelect }) => {
  return (
    <div className="suggestions">
      {suggestions.map((s, i) => (
        <button key={i} onClick={() => onSelect(s)}>
          {s}
        </button>
      ))}
    </div>
  );
};

export default SuggestionCards;