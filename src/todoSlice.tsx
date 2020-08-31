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
      state[action.payload.id - 1].title = action.payload.title
      return state;
    },
    DELETE_TODO : (state : todoNodeStructure[], action : { payload : { id : number}}) => { 
      state.splice(state.findIndex(todo => todo.id === action.payload.id),1);
      return state;
    },
    ACTIVE_ALL : (state : todoNodeStructure[]) => { 
      state.forEach(todo => todo.completed = false);
      return state;
    },
    COMPLETE_ALL : (state : todoNodeStructure[]) => { 
      state.forEach(todo => todo.completed = true);
      return state;
    },
    DELETE_ALL : (state : todoNodeStructure[]) => { 
      state.splice(0, state.length)
      return state;
    },
    MARK_AS_COMPLETE : (state : todoNodeStructure[], action : { payload : { id : number}}) => {
      var todoIndex: number = state.findIndex(todo => todo.id === action.payload.id);
      state[todoIndex].completed = !state[todoIndex].completed;
    }
  }
})

export default reducer;
export const { ADD_TODO, DELETE_TODO, UPDATE_TODO, ACTIVE_ALL, MARK_AS_COMPLETE, DELETE_ALL, COMPLETE_ALL } = actions; 