import React, { useState } from 'react';
import TodoList from './TodoList'
import { RootState } from './index'
import { connect } from 'react-redux'
import Buttons from './Buttons'
import './App.scss';
import { todoNodeStructure } from './todoSlice';
import { ADD_TODO, UPDATE_TODO, ACTIVE_ALL, COMPLETE_ALL, DELETE_ALL } from './todoSlice';
import { Button, InputGroup, InputGroupAddon, Input, Container, Row, Col, ListGroup, ListGroupItem, Badge, Alert } from 'reactstrap'

function App(props : any) {
  const [toDoTitle, updateToDoTitle] = useState('');
  const [editedTitle, updateExistingTitle] = useState('');
  const [id,updateId] = useState(0);
  const [alertNewToDo, toggleNewToDoAlertVisibility] = useState(false);
  const [alertEditToDo, toggleEditToDoAlertVisibility] = useState(false);

  return (
    <Container fluid>
      <h1>todos - <Badge color="info">{props.todos.length}</Badge></h1>
      <Row>
        <Col xs="4">
          <InputGroup>
            <Input type="text" placeholder="What do you want to do?" value={toDoTitle} onChange={(e) => { updateToDoTitle(e.target.value); e.target.value.length < 5 ? toggleNewToDoAlertVisibility(true) : toggleNewToDoAlertVisibility(false)}}/>
            <InputGroupAddon addonType="append"><Button color="primary" disabled={ toDoTitle.length < 5 ? true : false} id="todo_add_button" size="sm" onClick={() => { props.ADD_TODO({id: props.todos.length + 1, title : toDoTitle, completed : false}); updateToDoTitle('') }}>Add</Button></InputGroupAddon>
          </InputGroup>
        </Col>
        <Col>
          <Alert isOpen={alertNewToDo} color="info">Length of the field should be greater than 5</Alert>
        </Col>
      </Row>
      <TodoList updateToDoTitle={updateExistingTitle} updateId={updateId}/>
      <Row>
        <Col xs="4">
          <InputGroup>
            <Input type="text" id="edit_todo_input" disabled value={editedTitle} onChange={(e) => { updateExistingTitle(e.target.value); e.target.value.length < 5 ? toggleEditToDoAlertVisibility(true) : toggleEditToDoAlertVisibility(false) }}/>
            <InputGroupAddon addonType="append"><Button color="primary" size="sm" disabled={editedTitle.length < 5 || props.todos.find((todo : todoNodeStructure) => todo.id === id).title === editedTitle ? true : false} id="edit_todo_button" onClick={() => {props.UPDATE_TODO({id: id, title : editedTitle}); (document.getElementById('edit_todo_input') as HTMLInputElement).disabled = true; (document.getElementById('edit_todo_button') as HTMLButtonElement).disabled = true; updateExistingTitle(''); updateId(0)}}>Save</Button></InputGroupAddon>
          </InputGroup>
        </Col>
        <Col>
          <Alert isOpen={alertEditToDo} color="info">Length of the field should be greater than 5</Alert>
        </Col>
      </Row>
      <Row>
        <Buttons active_all={props.ACTIVE_ALL} complete_all={props.COMPLETE_ALL} delete_all={props.DELETE_ALL}/>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state : RootState) => ({
  todos : state
})

const mapDispatchToProps = { ADD_TODO, UPDATE_TODO, ACTIVE_ALL, COMPLETE_ALL, DELETE_ALL }

export default connect(mapStateToProps,mapDispatchToProps)(App);