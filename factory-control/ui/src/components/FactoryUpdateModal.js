import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
import { FactoryService } from '../services/service';

export function FactoryUpdateModal({ show, onClose, title, data }) {
  const [formData, setFormData] = useState(data);

  return (
    <Modal show={show} onHide={() => { setFormData(data); onClose(); }}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>State</Form.Label>
            <br />
            <Switch
              onChange={checked => setFormData({ ...formData, status: checked })}
              checked={formData.status}
              uncheckedIcon={false}
              checkedIcon={false}
              offColor="#ff0000"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type a message..."
              onChange={event => { setFormData({ ...formData, message: event.target.value }); }}
              value={formData.message}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { setFormData(data); onClose(); }}>
          Close
        </Button>
        <Button variant="primary" onClick={() => { FactoryService.Update({ ...formData }); }}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

FactoryUpdateModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
