import React, { Component } from "react";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class Orders extends Component {
  state = {
    error: false,
  };

  async componentDidMount() {
    this.props.initOrdersPage();
    this.props.initOrders(this.props.token, this.props.userId);
    // try {
    //   const response = await axios.get("/orders.json");
    //   let fetchedOrders = [];
    //   console.log(response.data);
    //   for (const [key, value] of Object.entries(response.data)) {
    //     fetchedOrders.push({ ...value, id: key });
    //   }
    //   console.log(fetchedOrders);
    //   this.setState({ orders: fetchedOrders, loading: false, error: false });
    // } catch (err) {
    //   this.setState({ loading: false, error: true });
    // }
  }
  render() {
    return (
      <div>
        {this.props.loading ? <Spinner /> : null}
        {!(Array.isArray(this.props.orders) && this.props.orders.length) && (
          <p>network error</p>
        )}
        {Array.isArray(this.props.orders) && this.props.orders.length
          ? this.props.orders.map((order) => (
              <Order
                ingredients={order.ingredients}
                price={order.price}
                key={order.id}
              />
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    initOrdersPage: () => dispatch(actions.fetchOrdersStart()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
