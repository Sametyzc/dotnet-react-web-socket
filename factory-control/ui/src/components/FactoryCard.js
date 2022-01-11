import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndustry } from '@fortawesome/free-solid-svg-icons';
import { FactoryUpdateModal } from './FactoryUpdateModal';

export function FactoryCard({ id, name, state, message }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text as="div">
            <div className="d-flex flex-row justify-content-center align-items-center">
              <FontAwesomeIcon color={state ? 'green' : 'red'} icon={faIndustry} size="5x" />
            </div>
            <br />
            <Card.Subtitle className="mb-2 text-muted">{state ? 'Everything all right!' : message}</Card.Subtitle>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button variant="primary" onClick={() => { setShowModal(true); }}>Update</Button>
        </Card.Footer>
      </Card>
      <FactoryUpdateModal
        show={showModal}
        onClose={() => { setShowModal(false); }}
        title={`${name} - Update`}
        data={{ status: state, message, id, name }}
      />
    </>
  );
}

FactoryCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  state: PropTypes.bool,
  message: PropTypes.string,
};

FactoryCard.defaultProps = {
  message: 'İşler tıkırında!',
  state: false,
};
