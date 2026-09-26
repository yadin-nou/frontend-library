import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FormTemplate from "../../components/FormTemplate";
import useFormHook from "../../hooks/useFormHook";
import {
  addBook,
  getAllBooks,
  updateBook,
} from "../../axiosHelp/axiosConnected";
import { toast } from "react-toastify";
import useSpinner from "../../hooks/useSpinner";
import { PencilFill } from "react-bootstrap-icons";
import { useEffect } from "react";

const AddBook = ({ handelGetAllBook, bookEdit = false, id }) => {
  const { formData, setFormData, handleOnChange } = useFormHook([]);
  const [edit, setEdit] = useState(bookEdit);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEdit = () => {
    setShow(true);
    getBookID();
  };
  const { spinner, setSpinner } = useSpinner(false);
  const book_id = { _id: id };
  const getBookID = async () => {
    const response = await getAllBooks(book_id);
    const book = response.book[0]; // unwrap array + nested key
    setFormData(book);
  };

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
      type: "text",
      label: "Author",
      required: true,
      placeholder: "Author",
      name: "author",
      value: formData.author,
    },
    {
      type: "text",
      label: "Image URL",
      required: true,
      placeholder: "Image URL",
      name: "imgURL",
      value: formData.imgURL,
    },
    {
      type: "text",
      label: "ISBN",
      required: true,
      placeholder: "BOOK ISBN CODE",
      name: "isbn",
      value: formData.isbn,
    },
    {
      type: "text",
      label: "Genre",
      required: true,
      placeholder: "Genre of book",
      name: "genre",
      value: formData.genre,
    },
  ];
  const handleSaveBook = async (e) => {
    e.preventDefault();
    try {
      setSpinner(true);
      const toJson = JSON.stringify(formData);
      const pendingResp = addBook(toJson);
      //promise is the behavior of pending
      toast.promise(pendingResp, { pending: "Please wait...." });
      const result = await pendingResp;
      if (result?.status === "success") {
        toast.success(result?.message);
        handelGetAllBook();
        setShow(false);
        setSpinner(false);
      } else {
        setSpinner(false);
        toast.error(result?.message);
      }
    } catch (error) {
      console.log(error.message);
      setSpinner(false);
    }
  };
  const handleUpdateBook = async (e) => {
    e.preventDefault();
    try {
      setSpinner(true);
      const pendingResp = updateBook(formData);
      //promise is the behavior of pending
      toast.promise(pendingResp, { pending: "Please wait...." });
      const result = await pendingResp;
      if (result?.status === "success") {
        toast.success(result?.message);
        setShow(false);
        handelGetAllBook();
        setSpinner(false);
      } else {
        setSpinner(false);
        toast.error(result?.message);
      }
    } catch (error) {
      console.log(error.message);
      setSpinner(false);
    }
  };
  return (
    <>
      {!edit ? (
        <Button variant="success" onClick={handleShow}>
          + Add Book
        </Button>
      ) : (
        <PencilFill
          className="me-3 text-secondary"
          role="button"
          onClick={handleEdit}
        />
      )}

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={edit ? handleUpdateBook : handleSaveBook}>
          <Modal.Header closeButton>
            <Modal.Title>
              {!edit ? "Adding Book Information" : "Editing Book Information"}
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
            {!spinner && (
              <Button type="submit" variant="success">
                {edit ? "Update" : "Save Changes"}
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddBook;
