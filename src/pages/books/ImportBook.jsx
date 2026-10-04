import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FormTemplate from "../../components/FormTemplate";
import useFormHook from "../../hooks/useFormHook.js";
// import { addBook } from "../../axiosHelp/axiosConnected.js";
import { toast } from "react-toastify";
// tell Vite you want the URL, not the parsed data, using Vite's ?url suffix:
import jsonPath from "@assets/jsonFormatTemplate.json?url";
import { addBookAction } from "../../features/book/bookAction.js";

const ImportBook = ({ handelGetAllBook }) => {
  const { formData, setFormData, handleOnChange } = useFormHook({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const url = import.meta.env.VITE_FRONT_END_URL;
  const formTPL = [
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
      const pendingResp = addBookAction(conToJson);
      toast.promise(pendingResp, { pending: "Please wait...." });
      const result = await pendingResp;
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

  const handleDowndLoadJsonTemplate = () => {};
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
            {formTPL.map((frm) => (
              <FormTemplate key={frm.name} {...frm} onChange={handleOnChange} />
            ))}
          </Modal.Body>
          <Modal.Footer>
            {/* <Button
              as="a"
              href={jsonFiles}
              download="jsonFormatTemplate.json"
              variant="primary"
            >
              Download JSON Template
            </Button> */}
            <a
              href={url + jsonPath}
              download="jsonFormatTemplate.json"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download JSON Template
            </a>
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
