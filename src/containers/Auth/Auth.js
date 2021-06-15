import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: " Password",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath) {
      this.props.onSetAuthRedirectPath();
    }
  }

  checkValidity = (value, rules) => {
    let isValid = false;
    if (rules) {
      if (rules.required) {
        isValid = value.trim() !== "";
      }
      if (rules.isEmail) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = re.test(String(value).toLowerCase());
      }
      if (rules.minLength) {
        isValid = value.length > 5;
      }
    }
    return isValid;
  };

  inputChangeHandler = (event, id) => {
    this.setState((prevState) => {
      prevState.controls[id].value = event.target.value;
      prevState.controls[id].valid = this.checkValidity(
        event.target.value,
        prevState.controls[id].validation
      );
      prevState.validForm = Object.values(prevState.controls).every(
        (val) => val.valid
      );
      return {
        ...prevState,
      };
    });
  };

  inputBlurHandler = (event, id) => {
    this.setState((prevState) => {
      prevState.controls[id].touched = true;
      return {
        ...prevState,
      };
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.authStart();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };
  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formElementsArray = [];

    Object.entries(this.state.controls).forEach(([key, val]) => {
      formElementsArray.push({
        id: key,
        config: val,
      });
    });

    const form = formElementsArray.map((el) => (
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
    ));

    let errorMassage = this.props.error ? <p>{this.props.error + ""}</p> : null;

    return (
      <div className={classes.Auth}>
        {this.props.isAuthenticated ? (
          <Redirect to={this.props.authRedirectPath} />
        ) : null}
        {errorMassage}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <form onSubmit={this.submitHandler}>
              {form}
              <Button btnType="Success">Submit</Button>
            </form>
            <Button clicked={this.switchAuthModeHandler} btnType="Danger">
              Switch To {this.state.isSignup ? "Sign In" : "Sign Up"}{" "}
            </Button>
          </React.Fragment>
        )}
        {/* <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          Switch To {this.state.isSignup ? "Sign In" : "Sign Up"}{" "}
        </Button> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authStart: () => dispatch(actions.authStart()),
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirect("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
