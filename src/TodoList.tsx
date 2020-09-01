import React, { useState } from 'react'
import { ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
import TodoNode from './TodoNode';
import { todoNodeStructure } from './todoSlice';
import InputForTodo from './InputForTodo';

const TodoList = React.memo(function TodoList(props : {todos : todoNodeStructure[]}) {
    const [editedTitle, updateSelectedTitle] = useState('');
    const [id,updateId] = useState(0);

    return (
        <ListGroup>
            {
                props.todos.map((todo : todoNodeStructure) => {
                    return (
                        <Row key={todo.id}>
                            <Col xs="4">
                                <ListGroupItem>
                                    <TodoNode title={todo.title} completed={todo.completed} id={todo.id} updateToDoTitle={updateSelectedTitle} updateId={updateId}/>
                                </ListGroupItem>
                            </Col>
                        </Row>
                    )
                })
            }
            <InputForTodo todos={props.todos} type="EDIT" id={id} editedTitle={editedTitle} updateSelectedTitle={updateSelectedTitle} updateId={updateId}></InputForTodo>
        </ListGroup>
    )
})

export default TodoList