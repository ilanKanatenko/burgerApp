import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-app-7f1aa-default-rtdb.firebaseio.com/",
});

export default instance;
