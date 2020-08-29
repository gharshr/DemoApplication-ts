import React, { useState } from 'react';
import TodoNode from './TodoNode'
import { RootState } from './index'
import { connect } from 'react-redux'
import './App.scss';
import { todoNodeStructure } from './todoSlice';
import { ADD_TODO, UPDATE_TODO } from './todoSlice'

function App(props : any) {
  const [toDoTitle, updateToDoTitle] = useState('');
  const [editedTitle, updateExistingTitle] = useState('');
  const [id,updateId] = useState(props.todos.length+1);

  return (
    <div className="App">
      <h1>todos</h1>
      <div className="opaque">
        <input type="text" placeholder="What do you want to do?" value={toDoTitle} onChange={(e) => updateToDoTitle(e.target.value)}/>
        <button type="button" onClick={() => { props.ADD_TODO({id: props.todos.length + 1, title : toDoTitle, completed : false}); updateToDoTitle('') }}>Add</button>
        {
          props.todos.map((todo : todoNodeStructure,index : number) => {
            return <TodoNode title={todo.title} completed={todo.completed} key={todo.id} id={todo.id} updateToDoTitle={updateExistingTitle} updateId={updateId}/>
          })
        }
      </div>
      <br/>
      <input id="edit_todo_input" disabled type="text" value={editedTitle} onChange={(e) => updateExistingTitle(e.target.value)}/>
      <button id="edit_todo_button" disabled onClick={() => { props.UPDATE_TODO({id: id, title : editedTitle}); (document.getElementById('edit_todo_input') as HTMLInputElement).disabled = true; (document.getElementById('edit_todo_button') as HTMLButtonElement).disabled = true}}>Save</button>
    </div>
  );
}

const mapStateToProps = (state : RootState) => ({
  todos : state
})

const mapDispatchToProps = { ADD_TODO, UPDATE_TODO }

export default connect(mapStateToProps,mapDispatchToProps)(App);