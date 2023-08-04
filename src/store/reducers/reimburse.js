import {API} from '../../api'
import to from "await-to-js"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  reimburseList: [],
  isLoading: false, 
  selectedReimburse: null
}


const reimburseSlice = createSlice({
  name: "todo",
  initialState,
  reducers:{
    addReimburse(state, action){
      state.reimburseList.push(action.payload)
    },
    deleteReimburse(state, action){
      state.reimburseList = state.reimburseList.filter((todo) => todo.id !== action.payload)
    },
    setReimburse(state,action){
      state.reimburseList = action.payload
    },
    completedReimburse(state, action){
      const completed = state.reimburseList.find((task => task.id === action.payload ))
      if(completed){
        completed.completed = true
      }
    },
    updatedReimburse(state, action) {
      state.reimburseList = state.reimburseList.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.data }
          : item
      );
    },
    setSelectedReimburse(state, action){
      state.selectedReimburse = state.reimburseList.find(item => item.id === action.payload)
    },
    resetSelectedReimbursement(state, action){
      state.selectedReimburse = null
    }
  }
})

export const fetchReimburse = createAsyncThunk(
  "reimburse/fetchData",
  async(params, {dispatch}) => {
    const [error, response] = await to(API.Reimburse.get())
    dispatch(setReimburse(response))
  }
)

export const {addReimburse, deleteReimburse, setReimburse, completedReimburse, updatedReimburse, setSelectedReimburse, resetSelectedReimbursement} = reimburseSlice.actions

export default reimburseSlice.reducer;