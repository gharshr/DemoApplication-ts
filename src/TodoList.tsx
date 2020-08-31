import { connect } from 'react-redux';
import React from 'react'
import { RootState } from './index'
import { ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
import TodoNode from './TodoNode';
import { todoNodeStructure } from './todoSlice';

const TodoList = React.memo(function TodoList(props : any) {
    return (
        <ListGroup>
            {
                props.todos.map((todo : todoNodeStructure) => {
                    return (
                    <Row key={todo.id}>
                        <Col xs="4">
                            <ListGroupItem>
                                <TodoNode title={todo.title} completed={todo.completed} id={todo.id} updateToDoTitle={props.updateToDoTitle} updateId={props.updateId}/>
                            </ListGroupItem>
                        </Col>
                    </Row>
                    )
                })
            }
        </ListGroup>
    )
})

const mapStateToProps = (state : RootState) => ({
    todos : state
})  

export default connect(mapStateToProps,{})(TodoList)