import React, { useState, useEffect } from 'react'
import { Col, InputGroup, Input, InputGroupAddon, Button, Alert, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { ADD_TODO, UPDATE_TODO, todoNodeStructure} from './todoSlice';
import { RootState } from '.';

const InputForTodo = React.memo(function (props : any = {editedTitle : ''}) {
    console.log(props.todos.find((todo : todoNodeStructure) => todo.id === props.id)?.title === props.editedTitle)
    const [toDoTitle, updateToDoTitle] = useState(props.editedTitle ? props.editedTitle : '');
    const [alertToDo, toggleToDoAlertVisibility] = useState(false);

    useEffect(() => {
        updateToDoTitle(props.editedTitle ? props.editedTitle : '')
    },[props.editedTitle])

    return (
        <Row>
            <Col xs="4">
                <InputGroup>
                    <Input type="text" disabled={props.type === "EDIT" ? true : false} id={props.type === "ADD" ? "add_todo_input" : "edit_todo_input"} placeholder={props.type === "ADD" ? "What do you want to do?" : "" } value={ toDoTitle } onChange={(e) => { updateToDoTitle(e.target.value); e.target.value.length < 5 ? toggleToDoAlertVisibility(true) : toggleToDoAlertVisibility(false)}}/>
                    <InputGroupAddon addonType="append">{props.type === "ADD" ? <Button color="primary" size="sm" id="todo_add_button" disabled={ toDoTitle.length < 5 ? true : false} onClick={() => { props.ADD_TODO({id: props.todos.length + 1, title : toDoTitle, completed : false}); updateToDoTitle('') }}>Add</Button>: <Button color="primary" size="sm" id="edit_todo_button" disabled={toDoTitle.length < 5 || props.todos.find((todo : todoNodeStructure) => todo.id === props.id)?.title === toDoTitle ? true : false} onClick={() => {props.UPDATE_TODO({id: props.id, title : toDoTitle}); (document.getElementById('edit_todo_input') as HTMLInputElement).disabled = true; (document.getElementById('edit_todo_button') as HTMLButtonElement).disabled = true; props.updateSelectedTitle(''); props.updateId(0)}}>Save</Button>}</InputGroupAddon>
                </InputGroup>
            </Col>
            <Col>
                <Alert isOpen={alertToDo} color="info">Length of the field should be greater than 5</Alert>
            </Col>
        </Row>
    )
})

const mapStateToProps = (state : RootState) => ({
    lastTodoId : state.lastTodoId
})

const mapDispatchToProps = { ADD_TODO, UPDATE_TODO }

export default connect(mapStateToProps,mapDispatchToProps)(InputForTodo);