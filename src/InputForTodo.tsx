import React from 'react'

React.memo(function InputForTodo(props) {
    return (
        <div>
            <Col xs="4">
            <InputGroup>
                <Input type="text" placeholder="What do you want to do?" value={toDoTitle} onChange={(e) => { updateToDoTitle(e.target.value); e.target.value.length < 5 ? toggleNewToDoAlertVisibility(true) : toggleNewToDoAlertVisibility(false)}}/>
                <InputGroupAddon addonType="append"><Button color="primary" disabled={ toDoTitle.length < 5 ? true : false} id="todo_add_button" size="sm" onClick={() => { props.ADD_TODO({id: props.todos.length + 1, title : toDoTitle, completed : false}); updateToDoTitle('') }}>Add</Button></InputGroupAddon>
            </InputGroup>
            </Col>
            <Col>
            <Alert isOpen={alertNewToDo} color="info">Length of the field should be greater than 5</Alert>
            </Col>
        </div>
    )
})