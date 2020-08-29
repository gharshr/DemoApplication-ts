import { createSlice } from  '@reduxjs/toolkit';

export interface todoNodeStructure {
  id : number,
  title : string,
  completed : boolean 
}

const { reducer, actions } = createSlice({
  name : 'todos',
  initialState : [{id : 1, title : 'Checkout the Storage', completed : false}, {id: 2, title : 'Check the passwords & Patternise', completed : true}] as todoNodeStructure[],
  reducers : {
    ADD_TODO : (state : todoNodeStructure[], action : {payload : todoNodeStructure}) => { 
      state.push(action.payload);
      return state;
    },
    UPDATE_TODO : (state : todoNodeStructure[], action : {payload : {id : number, title : string}}) => {
      state[action.payload.id].title = action.payload.title
      return state;
    },
    DELETE_TODO : state => state
  }
})

export default reducer;
export const { ADD_TODO, DELETE_TODO, UPDATE_TODO } = actions; 