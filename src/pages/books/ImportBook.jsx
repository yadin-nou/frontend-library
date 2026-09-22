import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FormTemplate from "../../components/FormTemplate";
import useFormHook from "../../hooks/useFormHook.js";
import { addBook } from "../../axiosHelp/axiosConnected.js";

const ImportBook = () => {
  const { formData, setFormData, handleOnChange } = useFormHook({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fromTPL = [
    {
      as: "textarea",
      label: "Please paste JSON data here:",
      required: true,
      placeholder: "JSON data here",
      name: "importBook",
      rows: 20,
      value: formData.ImportBook,
    },
  ];
  const handleOnImport = async (e) => {
    e.preventDefault();
    const conToJson = JSON.parse(formData.ImportBook);
    const addBookResult = await addBook(conToJson);
    console.log(addBookResult);
  };
  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        Import
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Import Book by JSON Data </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {fromTPL.map((frm) => (
              <FormTemplate key={frm.name} {...frm} onChange={handleOnChange} />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleOnImport}>
            Import
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ImportBook;
