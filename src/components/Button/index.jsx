import React from "react";

import "./styled.css";

export default function Button({ operation, label, click, double, triple }) {
  let classes = "btn ";
  classes += operation ? "operation " : "";
  classes += double ? "double " : "";
  classes += triple ? "triple " : "";

  return (
    <button
      type="button"
      onClick={() => click && click(label)}
      className={classes}
    >
      {label}
    </button>
  );
}
