import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import to from "await-to-js";
import { API } from "../../api";

const initialState = {
  users: [],
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAllUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const fetchUser = createAsyncThunk(
  "user/fetchuser",
  async (params, { dispatch }) => {
    const [error, response] = await to(API.User.get());
    dispatch(setAllUsers(response));
  }
);

export const { setAllUsers } = userSlice.actions;

export default userSlice.reducer;
