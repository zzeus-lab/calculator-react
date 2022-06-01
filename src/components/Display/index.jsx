import React from "react";
import "./styled.css";

export default function Display({ operator, value }) {
  return (
    <div className="display">
      <span>{operator}</span>
      <span className="number">{value}</span>
    </div>
  );
}
