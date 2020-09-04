import React from 'react';
import TodoList from './TodoList'
import { RootState } from './index'
import { connect } from 'react-redux'
import Buttons from './Buttons'
import './App.scss';
import { Container, Badge } from 'reactstrap'
import InputForTodo from './InputForTodo';
import { todoNodeStructure } from './todoSlice';

export function App(props : { todos : todoNodeStructure[] } = { todos : []}) {
  return (
    // <div>
    //   <h1>Hello People<p id="nine">This is just a demo test</p></h1>
    // </div>
    <Container fluid>
      <h1>todos - <Badge color="info">{props.todos.length}</Badge></h1>
      <InputForTodo todos={props.todos} type="ADD"></InputForTodo>
      <TodoList todos={props.todos}/>
      <Buttons/>
    </Container>
  );
}

const mapStateToProps = (state : RootState) => ({
  todos : state.todos
})

export default connect(mapStateToProps,null)(App);