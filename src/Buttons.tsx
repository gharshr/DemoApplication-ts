import React from 'react';
import { Col, Row, Button } from 'reactstrap';

const Buttons = React.memo(function Buttons(props : any) {
    return (
        <Col xs="4">
          <Row>
            <Col md={{offset : 3}}>
              <Button color="primary" size="sm" onClick={() => props.active_all()}>Add All</Button>
            </Col>
            <Col md={{offset : 1}}>
              <Button color="success" size="sm" onClick={() => props.complete_all()}>Complete All</Button>
            </Col>
            <Col md={{offset : 1}}>
              <Button color="danger" size="sm" onClick={() => props.delete_all()}>Delete All</Button>
            </Col>
          </Row>
        </Col>
    )
})

export default Buttons