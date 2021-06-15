import React from "react";
import classes from "./CheckOutSummary.module.css";
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";

const CheckOutSummary = (props) => {
  return (
    <div className={classes.CheckOutSummary}>
      <h1>We hope it taste well!</h1>
      <div className={classes.CheckOutSummaryContainer}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkOutCancelledHandler}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.checkOutContinueHandler}>
        Continue
      </Button>
    </div>
  );
};

export default CheckOutSummary;
