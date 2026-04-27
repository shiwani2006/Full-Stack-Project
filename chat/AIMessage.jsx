import React from "react";
import ProviderCard from "./ProviderCard";
import QuickActions from "./QuickActions";

const AIMessage = ({ data, onAction }) => {
  return (
    <div className="ai-message">
      <p>{data.text}</p>

      {data.providers &&
        data.providers.map((p, i) => (
          <ProviderCard key={i} provider={p} onAction={onAction} />
        ))}

      {data.actions && data.actions.length > 0 && (
        <QuickActions actions={data.actions} onClick={onAction} />
      )}
    </div>
  );
};

export default AIMessage;