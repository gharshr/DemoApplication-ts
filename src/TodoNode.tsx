import React from 'react';
import { connect } from 'react-redux'
import { DELETE_TODO, MARK_AS_COMPLETE } from './todoSlice';
import { Button, Input, Col, Row } from 'reactstrap'

// interface props extends todoNodeStructure {
//     updateToDoTitle : any,
//     updateId : any,
// }

const TodoNode = React.memo(function TodoNode(props : any ) {
    console.log(props)
    // const [completed,updateStatus] = useState(props.completed);
    return (
        <Row xs="4">
            <Col xs="1">
                <Input addon type="checkbox" checked={props.completed} onChange={() => props.MARK_AS_COMPLETE({id : props.id})}/>
            </Col>
            <Col xs="7"><b>{props.title}</b></Col>
            <Col md={{offset : 1}} xs="1">
                <Button color="warning" size="sm" onClick={() => { props.updateToDoTitle(props.title); props.updateId(props.id); (document.getElementById('edit_todo_input') as HTMLInputElement).disabled = false } }>Edit</Button>
            </Col>
            <Col xs="1">    
                <Button color="danger" size="sm" onClick={() => { props.DELETE_TODO({ id : props.id }) }}>Delete</Button>
            </Col>
        </Row>
    )
})

const mapDispatchToProps = { DELETE_TODO, MARK_AS_COMPLETE }

export default connect(null,mapDispatchToProps)(TodoNode);