import React from "react";
import "./styled.css";

export default (props) => (
  <div className="display">
    <span>{props.operator}</span>
    <span className="number">{props.value}</span>
  </div>
);
