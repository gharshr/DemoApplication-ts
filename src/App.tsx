import React, { useState } from 'react';
import TodoNode from './TodoNode'
import { RootState } from './index'
import { connect } from 'react-redux'
import './App.scss';
import { todoNodeStructure } from './todoSlice';
import { ADD_TODO } from './todoSlice'

function App(props : any) {
  const [toDoTitle, updateToDoTitle] = useState('');

  return (
    <div className="App">
      <h1>todos</h1>
      <div className="opaque">
        <input type="text" placeholder="What do you want to do?" value={toDoTitle} onChange={(e) => updateToDoTitle(e.target.value)}/>
        {
          props.todos.map((todo : todoNodeStructure,index : number) => {
            return <TodoNode title={todo.title} completed={todo.completed} key={index}/>
          })
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state : RootState) => ({
  todos : state
})

const mapDispatchToProps = { ADD_TODO }

export default connect(mapStateToProps,mapDispatchToProps)(App);