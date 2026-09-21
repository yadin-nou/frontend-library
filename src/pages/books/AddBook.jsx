import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FormTemplate from "../../components/FormTemplate";

const AddBook = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fromTPL = [
    {
      type: "text",
      label: "Title",
      required: true,
      placeholder: "Title",
      name: "title",
      //value:
    },

    {
      type: "text",
      label: "Author",
      required: true,
      placeholder: "Author",
      name: "author",
      //value:
    },
    {
      type: "text",
      label: "Image URL",
      required: true,
      placeholder: "Image URL",
      name: "image",
      //value:
    },
    {
      type: "text",
      label: "ISBN",
      required: true,
      placeholder: "BOOK ISBN CODE",
      name: "isbn",
      // value: ,
    },
    {
      type: "text",
      label: "Genre",
      required: true,
      placeholder: "Genre of book",
      name: "genre",
      // value: ,
    },
  ];
  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        + Add Book
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding Book Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {fromTPL.map((frm) => (
              <FormTemplate key={frm.name} {...frm} />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddBook;
