import { createSlice } from  '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
    name : 'todos',
    initialState : [{title : 'Checkout the Storage', status : 'active'}],
    reducers : {
      ADD_TODO : state => state,
      DELETE_TODO : state => state
    }
})

export default reducer;
export const { ADD_TODO, DELETE_TODO } = actions; 