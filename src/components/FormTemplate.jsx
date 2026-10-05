import React from "react";
import { Form } from "react-bootstrap";

const FormTemplate = ({ label, error, ...rest }) => {
  return (
    <div>
      <Form.Group className="mb-3" controlId={rest.name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control {...rest} />
        {error && <Form.Text className="text-danger">{error}</Form.Text>}
      </Form.Group>
    </div>
  );
};

export default FormTemplate;
