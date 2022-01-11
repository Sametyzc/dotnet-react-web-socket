import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FactoryCard } from './FactoryCard';
import { WebSocketContext } from '../context/WebSocket';

export function FactoryList() {
  const { factoryList } = useContext(WebSocketContext);

  useEffect(() => {
    console.log('factoryList');
    console.log(factoryList);
  }, [factoryList]);

  return (
    <div className="h-100 d-flex flex-row justify-content-center align-items-center">
      <Container>
        {
            Array.isArray(factoryList) &&
            factoryList.reduce((accumulator, currentValue, currentIndex, array) => {
              if (currentIndex % 3 === 0) {
                accumulator.push(array.slice(currentIndex, currentIndex + 3));
              }
              return accumulator;
            }, []).map((element, index) => (
              <Row key={index} className="my-5">
                <Col><FactoryCard id={element[0].Id} name={element[0].Name} state={element[0].Status} message={element[0].Message} /></Col>
                <Col><FactoryCard id={element[1].Id} name={element[1].Name} state={element[1].Status} message={element[1].Message} /></Col>
                <Col><FactoryCard id={element[2].Id} name={element[2].Name} state={element[2].Status} message={element[2].Message} /></Col>
              </Row>
            ))
        }
      </Container>
    </div>
  );
}
