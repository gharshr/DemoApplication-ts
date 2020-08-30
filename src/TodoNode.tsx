import React, { useState } from 'react';
import { todoNodeStructure } from './todoSlice';
import { Button, Input, Col, Row } from 'reactstrap'

interface props extends todoNodeStructure {
    updateToDoTitle : any,
    updateId : any
}

function TodoNode(props : props ) {
    //console.log(rest)
    const [completed,updateStatus] = useState(props.completed);
    const [title,updateTitle] = useState(props.title);
    return (
        <Row xs="3">
            <Col xs="1">
                <Input addon type="checkbox" checked={completed} onChange={() => updateStatus(!completed)}/>
            </Col>
            <Col xs="7"><b>{props.title}</b></Col>
            <Col>
                <Button color="warning" size="sm" onClick={() => { props.updateToDoTitle(title); props.updateId(props.id); (document.getElementById('edit_todo_input') as HTMLInputElement).disabled = false } }>Edit</Button>
                <Button color="danger" size="sm" onClick={() => { props.updateToDoTitle(title); props.updateId(props.id); (document.getElementById('edit_todo_input') as HTMLInputElement).disabled = false } }>Delete</Button>
            </Col>
        </Row>
    )
}

export default TodoNode;