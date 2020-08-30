import React, { useState } from 'react';
import TodoNode from './TodoNode'
import { RootState } from './index'
import { connect } from 'react-redux'
import './App.scss';
import { todoNodeStructure } from './todoSlice';
import { ADD_TODO, UPDATE_TODO } from './todoSlice';
import { Button, InputGroup, InputGroupAddon, Input, Container, Row, Col, ListGroup, ListGroupItem, Badge, Tooltip } from 'reactstrap'

function App(props : any) {
  const [toDoTitle, updateToDoTitle] = useState('');
  const [editedTitle, updateExistingTitle] = useState('');
  const [id,updateId] = useState(0);

  return (
    <Container fluid>
      <h1>todos - <Badge color="info">{props.todos.length}</Badge></h1>
      <Row>
        <Col xs="4">
          <InputGroup>
            <Input type="text" placeholder="What do you want to do?" value={toDoTitle} onChange={(e) => updateToDoTitle(e.target.value)}/>
            <InputGroupAddon addonType="append"><Button color="primary" size="sm" onClick={() => { props.ADD_TODO({id: props.todos.length + 1, title : toDoTitle, completed : false}); updateToDoTitle('') }}>Add</Button></InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
      <ListGroup>
        {
          props.todos.map((todo : todoNodeStructure,index : number) => {
            return (
              <Row>
                <Col xs="4">
                  <ListGroupItem>
                    <TodoNode title={todo.title} completed={todo.completed} key={todo.id} id={todo.id} updateToDoTitle={updateExistingTitle} updateId={updateId}/>
                  </ListGroupItem>
                </Col>
              </Row>
            )
          })
        }
      </ListGroup>
      <Row>
        <Col xs="4">
          <InputGroup>
            <Input type="text" id="edit_todo_input" disabled value={editedTitle} onChange={(e) => updateExistingTitle(e.target.value)}/>
            <InputGroupAddon addonType="append"><Button color="primary" size="sm" disabled={editedTitle === '' ? true : false} id="edit_todo_button" onClick={() => {props.UPDATE_TODO({id: id, title : editedTitle}); (document.getElementById('edit_todo_input') as HTMLInputElement).disabled = true; (document.getElementById('edit_todo_button') as HTMLButtonElement).disabled = true; updateExistingTitle(''); updateId(0)}}>Save</Button></InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
      <Button color="primary" id="add_all_button" size="sm">Add All</Button>
      <Tooltip placement="right" target="add_all_button">
        Hello world!
      </Tooltip>
      <Button color="danger" size="sm">Delete All</Button>
    </Container>
  );
}

const mapStateToProps = (state : RootState) => ({
  todos : state
})

const mapDispatchToProps = { ADD_TODO, UPDATE_TODO }

export default connect(mapStateToProps,mapDispatchToProps)(App);