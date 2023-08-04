import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/user'
import reimburseReducer from "./reducers/reimburse";
const store = configureStore({
  reducer:{
    reimbursement: reimburseReducer,
    user: userReducer
  }
})

export default store;