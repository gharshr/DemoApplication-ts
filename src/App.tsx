import React, { useEffect } from 'react';
import TodoList from './TodoList'
import { RootState } from './index'
import { connect } from 'react-redux'
import Buttons from './Buttons'
import './App.scss';
import { Container, Badge } from 'reactstrap'
import InputForTodo from './InputForTodo';
import { todoNodeStructure, INITIALIZE_TODOS } from './todoSlice';

export function App(props : any = {INITIALIZE_TODOS : (a : RootState) => {}}) {
  
  useEffect(() => {
    console.log('called only once');
    fetch('/todos',{
      'method' : 'get',
    }).then(response => response.json()).then(data => { 
      console.log(data)
      props.INITIALIZE_TODOS({ todos : data, lastTodoId : data.length > 0 ? data.reduce((max : todoNodeStructure, node : todoNodeStructure) => {
        console.log(max)
        if(node.id > max.id)
          max = node
        return max
      }).id : 0})
    })
  },[])
  
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

const mapDispatchToProps = { INITIALIZE_TODOS }

export default connect(mapStateToProps,mapDispatchToProps)(App);