import React from "react";
import "../../src/button.css";
import { Typography } from "@mui/material";

export default function OptionSelection({ arrayItems, selectOption,setBack }) {
  return (
    <>
      <h1 className="buttons"  >BaatCheet.io</h1>
      <Typography variant="h5" >THIS APP IS FOR PEOPLE WHO WANT TO CREATE THEIR OWN DESTINY.</Typography>

      <div className="grid-main">
        {arrayItems.map((item) => {
          return (
            <div
              className="grid-child"
              onClick={() => {selectOption(item.option); setBack(false)}}
              key={item.name}
            >
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
