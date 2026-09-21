import React from "react";
import { Form } from "react-bootstrap";

const FormTemplate = ({ label, ...rest }) => {
  return (
    <div>
      <Form.Group className="mb-3" controlId={rest.name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control {...rest} />
      </Form.Group>
    </div>
  );
};

export default FormTemplate;
