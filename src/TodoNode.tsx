import React from 'react';
import { connect } from 'react-redux'
import { DELETE_TODO, TOGGLE_COMPLETED } from './todoSlice';
import { Button, Input, Col, Row } from 'reactstrap'

// interface props extends todoNodeStructure {
//     updateToDoTitle : any,
//     updateId : any,
// }

export const TodoNode = React.memo(function TodoNode(props : any ) {
    // console.log(props)
    // const [completed,updateStatus] = useState(props.completed);
    function onToggle() {
        fetch(`/toggle/${props.id}`,{
            method : 'get'
        }).then(res => res.json()).then(data => {
            if(data.successfullOrNot) 
                props.TOGGLE_COMPLETED({id : props.id})
            else
                alert(data.message)
        }).catch(err => console.log(err))
    }

    function onDelete() {
        fetch(`/todo/${props.id}`,{
            method : 'delete'
        }).then(res => res.json()).then(data => {
            if(data.successfullOrNot) 
                props.DELETE_TODO({ id : props.id })
            else
                alert(data.message)
        }).catch(err => console.log(err))
    }
    
    return (
        <Row xs="4">
            <Col xs="1">
                <Input addon type="checkbox" checked={props.completed} onChange={onToggle}/>
            </Col>
            <Col xs="7"><b>{props.title}</b></Col>
            <Col md={{offset : 1}} xs="1">
                <Button color="warning" size="sm" onClick={() => { props.updateToDoTitle(props.title); props.updateId(props.id); (document.getElementById('edit_todo_input') as HTMLInputElement).disabled = false } }>Edit</Button>
            </Col>
            <Col xs="1">    
                <Button color="danger" size="sm" onClick={onDelete}>Delete</Button>
            </Col>
        </Row>
    )
})

const mapDispatchToProps = { DELETE_TODO, TOGGLE_COMPLETED }

export default connect(null,mapDispatchToProps)(TodoNode);