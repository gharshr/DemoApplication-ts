import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import { ACTIVE_ALL,COMPLETE_ALL,DELETE_ALL } from './todoSlice';
import { connect } from 'react-redux'

export const Buttons = React.memo(function Buttons(props : any) {
  return (
    <Row>
      <Col xs="4">
        <Row>
          <Col md={{offset : 3}}>
            <Button color="primary" size="sm" onClick={() => props.ACTIVE_ALL()}>Add All</Button>
          </Col>
          <Col md={{offset : 1}}>
            <Button color="success" size="sm" onClick={() => props.COMPLETE_ALL()}>Complete All</Button>
          </Col>
          <Col md={{offset : 1}}>
            <Button color="danger" size="sm" onClick={() => props.DELETE_ALL()}>Delete All</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
})

const mapDispatchToProps = { ACTIVE_ALL, COMPLETE_ALL, DELETE_ALL }

export default connect(null,mapDispatchToProps)(Buttons)