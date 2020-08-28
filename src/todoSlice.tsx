import { createSlice } from  '@reduxjs/toolkit';

export interface todoNodeStructure {
  title : string,
  completed : boolean 
}

const { reducer, actions } = createSlice({
  name : 'todos',
  initialState : [{title : 'Checkout the Storage', completed : false}, {title : 'Check the passwords & Patternise', completed : true}] as todoNodeStructure[],
  reducers : {
    ADD_TODO : state => state,
    DELETE_TODO : state => state
  }
})

export default reducer;
export const { ADD_TODO, DELETE_TODO } = actions; 