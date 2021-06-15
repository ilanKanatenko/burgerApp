import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients).flatMap(
    (ingredKey) => {
      return [...Array(props.ingredients[ingredKey])].map((_, index) => {
        return <BurgerIngredient key={ingredKey + index} type={ingredKey} />;
      });
    }
  );

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add items</p>;
  }

  //   console.log(toShow);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
