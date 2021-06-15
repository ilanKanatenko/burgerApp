import React, { Component } from "react";

import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
// import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as orderActions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your name" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Street" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Zip Code" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
      },
      country: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Country" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your E-Mail" },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        valid: true,
      },
    },
    validForm: false,
  };

  checkValidity = (value, rules) => {
    let isValid = false;
    if (rules) {
      if (rules.required) {
        isValid = value.trim() !== "";
      }
    }

    return isValid;
  };

  orderHandler = async (event) => {
    event.preventDefault();
    this.props.onOrderStart();
    try {
      let formData = {};
      Object.entries(this.state.orderForm).forEach(([key, val]) => {
        formData[key] = val.value;
      });
      const order = {
        ingredients: this.props.igs,
        price: this.props.price.toFixed(2),
        orderData: formData,
        userId: this.props.userId,
      };
      this.props.onOrderBurger(order);
      // const response = await axios.post("/orders.json", order);
      // this.setState({ loading: false });
      // this.props.history.push("/");
    } catch (err) {
      // console.log(err);
      // this.setState({ loading: false });
    }
  };

  inputChangeHandler = (event, id) => {
    this.setState((prevState) => {
      prevState.orderForm[id].value = event.target.value;
      prevState.orderForm[id].valid = this.checkValidity(
        event.target.value,
        prevState.orderForm[id].validation
      );
      prevState.validForm = Object.values(prevState.orderForm).every(
        (val) => val.valid
      );
      return {
        ...prevState,
      };
    });
  };

  inputBlurHandler = (event, id) => {
    this.setState((prevState) => {
      prevState.orderForm[id].touched = true;
      return {
        ...prevState,
      };
    });
  };

  render() {
    const formElementsArray = [];

    Object.entries(this.state.orderForm).forEach(([key, val]) => {
      formElementsArray.push({
        id: key,
        config: val,
      });
    });
    const form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((el) => (
          <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            changed={(event) => this.inputChangeHandler(event, el.id)}
            blur={(event) => this.inputBlurHandler(event, el.id)}
            invalid={!el.config.valid && el.config.touched}
            shouldValidate={el.config.validation}
          />
        ))}
        {/* <Input
          input_type="input"
          type="text"
          name="name"
          placeholder="name"
        ></Input>
        <Input
          input_type="input"
          type="email"
          name="email"
          placeholder="email"
        ></Input>
        <Input
          input_type="input"
          type="text"
          name="street"
          placeholder="street"
        ></Input>
        <Input
          input_type="input"
          type="text"
          name="postal"
          placeholder="postal"
        ></Input> */}
        <Button
          disabled={!this.state.validForm}
          clicked={this.orderHandler}
          btnType="Success"
        >
          ORDER
        </Button>
      </form>
    );
    const spinner = <Spinner />;
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {this.props.loading ? spinner : form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    igs: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (order) => {
      dispatch(orderActions.purchaseBurger(order));
    },
    onOrderStart: () => {
      dispatch(orderActions.purchaseBurgerStart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
