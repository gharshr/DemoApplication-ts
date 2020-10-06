import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import { ACTIVE_ALL,COMPLETE_ALL,DELETE_ALL } from './todoSlice';
import { connect } from 'react-redux'

export const Buttons = React.memo(function Buttons(props : any) {
  function onActiveAll() {
    fetch('/activeAll',{
      method : 'get'
    }).then(res => res.json()).then(data => {
      if(data.successfullOrNot) 
        props.ACTIVE_ALL()
      else
        alert(data.message)
    }).catch(err => console.log(err))
  }

  function onCompleteAll() {
    fetch('/completeAll',{
      method : 'get'
    }).then(res => res.json()).then(data => {
      if(data.successfullOrNot) 
        props.COMPLETE_ALL()
      else
        alert(data.message)
    }).catch(err => console.log(err))
  }

  function onDeleteAll() {
    fetch(`/todo/all`,{
      method : 'delete'
    }).then(res => res.json()).then(data => {
      if(data.successfullOrNot) 
        props.DELETE_ALL()
      else
        alert(data.message)
    }).catch(err => console.log(err))
  }

  console.log(props)
  return (
    <Row>
      <Col xs="4">
        <Row>
          <Col md={{offset : 3}}>
            <Button color="primary" size="sm" onClick={onActiveAll}>Add All</Button>
          </Col>
          <Col md={{offset : 1}}>
            <Button color="success" size="sm" onClick={onCompleteAll}>Complete All</Button>
          </Col>
          <Col md={{offset : 1}}>
            <Button color="danger" size="sm" onClick={onDeleteAll}>Delete All</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
})

const mapDispatchToProps = { ACTIVE_ALL, COMPLETE_ALL, DELETE_ALL }

export default connect(null,mapDispatchToProps)(Buttons)