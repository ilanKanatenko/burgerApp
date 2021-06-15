import React, { Component } from "react";
import CheckOutSummary from "../../components/CheckOutSummary/CheckOutSummary";
import { Redirect, Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class CheckOut extends Component {
  componentDidMount() {
    // if (this.props.location.search) {
    //   this.setState({
    //     ingredients: JSON.parse(decodeURI(this.props.location.search.slice(1))),
    //   });
    // }
    // console.log(this.props);
  }

  checkOutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkOutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.igs) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckOutSummary
            checkOutCancelledHandler={this.checkOutCancelledHandler}
            checkOutContinueHandler={this.checkOutContinueHandler}
            ingredients={this.props.igs}
          />
          <Route
            path={this.props.match.url + "/contact-data"}
            // render={(props) => (
            //   <ContactData ingredients={this.props.igs} {...props} />
            // )}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    igs: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(CheckOut);
