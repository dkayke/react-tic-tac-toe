import React from "react";
import "./style.css";

interface IProps {
  value: string;
  onClick: any;
}

function Campo(props: IProps) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Campo;
