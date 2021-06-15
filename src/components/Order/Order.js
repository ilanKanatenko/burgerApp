import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  let ingredientOutput = Object.entries(props.ingredients).map(
    ([key, value]) => (
      <span className={classes.Span} key={key}>
        {key} ({value}){" "}
      </span>
    )
  );
  //   const ingredientOutput = props.ingredients.map((ig) => (
  //     <span className={classes.Span}> </span>
  //   ));
  return (
    <div className={classes.Order}>
      <p>{ingredientOutput}</p>
      <p>
        Price: <strong> {props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
