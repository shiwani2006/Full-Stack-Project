import React from "react";

const MessageBubble = ({ message }) => {
  return (
    <div className={`bubble ${message.sender}`}>
      <p style={{ whiteSpace: "pre-line" }}>{message.text}</p>

      {message.providers &&
        message.providers.map((provider, i) => (
          <div key={i} className="provider-card">
            <h4>{provider.name}</h4>
            <p>⭐ {provider.rating}</p>
            <p>₹{provider.price}</p>
            <p>{provider.available}</p>
            <small>{provider.specialty}</small>
          </div>
        ))}

      {message.actions && (
        <div className="quick-actions">
          {message.actions.map((action, i) => (
            <button key={i}>{action}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;