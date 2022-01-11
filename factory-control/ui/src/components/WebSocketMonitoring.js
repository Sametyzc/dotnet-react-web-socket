import React, { useContext } from 'react';
import { Alert, Container, Row, Col, Button } from 'react-bootstrap';
import { BaseConfig } from '../config/AppConfig';
import { WebSocketContext } from '../context/WebSocket';

const StateAlerts = {
  CONNECTING: <Alert variant="info">Connecting...</Alert>,
  OPEN: <Alert variant="success">Connection established!</Alert>,
  CLOSING: <Alert variant="warning">Connection is closing...</Alert>,
  CLOSED: <Alert variant="danger">Connection is closed!</Alert>,
  NOTCONNECTED: <Alert variant="secondary">Not connected yet!</Alert>,
};

export function WebSocketMonitoring() {
  const { wsState, connectWs, closeWs } = useContext(WebSocketContext);
  return (
    <div className="h-100 d-flex flex-row justify-content-center align-items-center">
      <Container>
        <Row className="my-5">
          <Col>{[StateAlerts[Object.keys(BaseConfig.webSocketState).find(index => BaseConfig.webSocketState[index] === wsState)]]}</Col>
        </Row>
        <Row className="my-5 d-flex flex-row justify-content-center align-items-center">
          <Col className="d-flex justify-content-center">
            <Button
              variant="success"
              disabled={BaseConfig.webSocketState.CLOSED !== wsState && BaseConfig.webSocketState.NOTCONNECTED !== wsState}
              onClick={() => { connectWs(); }}
            >
              Start Connection
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button
              variant="secondary"
              disabled={BaseConfig.webSocketState.OPEN !== wsState}
              onClick={() => { closeWs(); }}
            >
              End Connection
            </Button>
          </Col>
        </Row>
      </Container>
    </div>

  );
}
