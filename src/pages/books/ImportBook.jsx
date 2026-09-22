import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FormTemplate from "../../components/FormTemplate";
import useFormHook from "../../hooks/useFormHook.js";
import { addBook } from "../../axiosHelp/axiosConnected.js";
import { toast } from "react-toastify";

const ImportBook = ({ handelGetAllBook }) => {
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
      value: formData.importBook,
    },
  ];
  const handleOnImport = async (e) => {
    e.preventDefault();

    try {
      const conToJson = JSON.parse(formData.importBook);
      const result = await addBook(conToJson);
      if (result?.status === "success") {
        toast.success(result.message);
        handelGetAllBook();
        setShow(false);
      } else {
        toast.error(result?.message || "Failed to import book.");
      }
    } catch (error) {
      toast.error("Invalid JSON format!");
      return;
    }
  };
  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        Import
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleOnImport}>
          <Modal.Header closeButton>
            <Modal.Title>Import Book by JSON Data </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {fromTPL.map((frm) => (
              <FormTemplate key={frm.name} {...frm} onChange={handleOnChange} />
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="success">
              Import
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ImportBook;
