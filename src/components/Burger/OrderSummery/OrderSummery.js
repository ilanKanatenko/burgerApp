import React, { Component } from "react";
import Button from "../../UI/Button/Button";

class OrderSummery extends Component {
  // console.log(ingredientSummary);
  componentDidUpdate() {}

  render() {
    const ingredientSummary = Object.entries(this.props.ingredients).map(
      ([key, val]) => {
        return (
          <li key={key}>
            {" "}
            <span style={{ textTransform: "capitalize" }}>{key}</span>: {val}
          </li>
        );
      }
    );

    return (
      <React.Fragment>
        <h3>Your Order</h3>
        <p>A delicious Burger with the following ingredients</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout</p>

        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        {/* <Link
          to={"/checkout?" + encodeURI(JSON.stringify(this.props.ingredients))}
        > */}
        <Button clicked={this.props.purchaseContinue} btnType="Success">
          CONTINUE
        </Button>
        {/* </Link> */}
      </React.Fragment>
    );
  }
}

export default OrderSummery;
