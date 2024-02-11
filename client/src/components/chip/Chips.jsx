import React from "react";
import "./style.css";

const Chips = ({ name, onSelect }) => {
  return (
    <span className="mainContainer" onClick={() => onSelect()}>
      {name}
    </span>
  );
};

export default Chips;
