import { createSlice } from  '@reduxjs/toolkit';

export interface todoNodeStructure {
  id : number,
  title : string,
  completed : boolean 
}

const { reducer, actions } = createSlice({
  name : 'todos',
  initialState : { todos: [{id : 1, title : 'Checkout the Storage', completed : false}, {id: 2, title : 'Check the passwords & Patternise', completed : true}], lastTodoId : 2} as { todos : todoNodeStructure[], lastTodoId : number },
  reducers : {
    ADD_TODO : (state : { todos : todoNodeStructure[], lastTodoId : number }, action : {payload : todoNodeStructure}) => { 
      state.todos.push(action.payload);
      return state;
    },
    UPDATE_TODO : (state : { todos : todoNodeStructure[], lastTodoId : number }, action : {payload : {id : number, title : string}}) => {
      state.todos[state.todos.findIndex(todo => todo.id === action.payload.id)].title = action.payload.title
      return state;
    },
    DELETE_TODO : (state : { todos : todoNodeStructure[], lastTodoId : number }, action : { payload : { id : number}}) => { 
      state.todos.splice(state.todos.findIndex(todo => todo.id === action.payload.id),1);
      return state;
    },
    ACTIVE_ALL : (state : { todos : todoNodeStructure[], lastTodoId : number }) => { 
      state.todos.forEach(todo => todo.completed = false);
      return state;
    },
    COMPLETE_ALL : (state : { todos : todoNodeStructure[], lastTodoId : number }) => { 
      state.todos.forEach(todo => todo.completed = true);
      return state;
    },
    DELETE_ALL : (state : { todos : todoNodeStructure[], lastTodoId : number }) => { 
      state.todos.splice(0, state.todos.length)
      return state;
    },
    TOGGLE_COMPLETED : (state : { todos : todoNodeStructure[], lastTodoId : number }, action : { payload : { id : number}}) => {
      var todoIndex: number = state.todos.findIndex(todo => todo.id === action.payload.id);
      state.todos[todoIndex].completed = !state.todos[todoIndex].completed;
    }
  }
})

export default reducer;
export const { ADD_TODO, DELETE_TODO, UPDATE_TODO, ACTIVE_ALL, TOGGLE_COMPLETED, DELETE_ALL, COMPLETE_ALL } = actions; 