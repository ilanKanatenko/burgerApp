import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        "/orders.json?auth=" + token,
        orderData
      );
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    } catch (err) {
      dispatch(purchaseBurgerFail(err));
    }
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return async (dispatch) => {
    try {
      const queryParams =
        "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';

      const response = await axios.get("/orders.json" + queryParams);
      let fetchedOrders = [];
      for (const [key, value] of Object.entries(response.data)) {
        fetchedOrders.push({ ...value, id: key });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    } catch (err) {
      dispatch(fetchOrdersSuccess(err));
    }
  };
};
