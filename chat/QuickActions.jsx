import React from "react";

const QuickActions = ({ actions, onClick }) => {
  return (
    <div className="quick-actions">
      {actions.map((action, i) => (
        <button key={i} onClick={() => onClick(action)}>
          {action}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;