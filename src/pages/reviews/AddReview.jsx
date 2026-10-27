import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FormTemplate from "../../components/FormTemplate";
import useFormHook from "../../hooks/useFormHook";
import { toast } from "react-toastify";
import useSpinner from "../../hooks/useSpinner";
import { insertReviewAction } from "../../features/review/reviewAction";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";

const AddReview = ({ bookId, borrowId, role }) => {
  const { formData, setFormData, handleOnChange } = useFormHook([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const { spinner, setSpinner } = useSpinner(false);
  const dispatch = useDispatch();
  const fromTPL = [
    {
      type: "text",
      label: "Title",
      required: true,
      placeholder: "Title",
      name: "title",
      value: formData.title,
    },

    {
      as: "textarea",
      label: "Message",
      required: true,
      placeholder: "Type your thought",
      name: "reviewMessage",
      rows: 5,
      value: formData.message,
    },

    {
      type: "number",
      label: "Rating",
      required: true,
      min: 1,
      max: 5,
      placeholder: "Range 1-5",
      name: "rating",
      value: formData.rating,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    //setFormData({ ...formData});

    //setTimeout(() => {
    const pendingRes = dispatch(insertReviewAction(formData, role));
    toast.promise(pendingRes, { pending: "Please wait...." });
    //}, 1000);
    try {
      const { status, message } = await pendingRes;
      if (status === "success") {
        setSpinner(false);
        toast.success(message);
        handleClose();
      }
      if (status === "error") {
        setSpinner(false);
        toast.error(message);
        handleShow();
        return;
      }
    } finally {
      setSpinner(false);
      handleClose();
    }
  };
  useEffect(() => {
    setFormData({ bookId, borrowId });
  }, []);

  //console.log(formData);
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleOnSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>Adding Review</h4>
            </Modal.Title>
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
            {spinner ? (
              <Spinner animation="border" variant="primary"></Spinner>
            ) : (
              <Button type="submit" variant="success">
                Submit
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddReview;
