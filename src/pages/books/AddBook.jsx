import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FormTemplate from "../../components/FormTemplate";
import useFormHook from "../../hooks/useFormHook";
import { CiCircleRemove } from "react-icons/ci";
// import {
//   addBook,
//   getAllBooks,
//   updateBook,
// } from "../../axiosHelp/axiosConnected";
import { toast } from "react-toastify";
import useSpinner from "../../hooks/useSpinner";
import { PencilFill } from "react-bootstrap-icons";
import { useEffect } from "react";
import {
  addBookAction,
  bookImgDeleteAction,
  getAllBooksAction,
  updateBookAction,
} from "../../features/book/bookAction";
import { useDispatch, useSelector } from "react-redux";
import {
  setBookCollection,
  setBookEmpty,
  updateBookInCollection,
} from "../../features/book/bookSlice";

const AddBook = ({ handelGetAllBook, bookEdit = false, id }) => {
  const { formData, setFormData, handleOnChange } = useFormHook([]);
  const [edit, setEdit] = useState(bookEdit);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [imgSel, setImgSel] = useState(null);
  const [imgURLSel, setImgURLSel] = useState(null);
  const [imgDelPat, setImgDelPat] = useState(null);
  const [imgDel, setImgDel] = useState(false);
  const [isDel, setIsDel] = useState(false);
  const imgPath = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();
  const book = useSelector((state) =>
    state.bookInfo.bookCollection.find((b) => b._id === id),
  );
  const handleEdit = () => {
    setShow(true);
    //getBookID();
    setFormData(book);
    setImgSel(null);
    setImgDel(false);
    setImgURLSel(null);
    setImgDelPat(null);
  };
  const { spinner, setSpinner } = useSpinner(false);
  //const book_id = { _id: id };
  // const getBookID = () => {
  //   // const response = await getAllBooksAction(book_id);
  //   //const book = response; // unwrap array + nested key
  //   setFormData(book);
  // };

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
    // {
    //   type: "text",
    //   label: "Image URL",
    //   required: true,
    //   placeholder: "Image URL",
    //   name: "imgURL",
    //   value: formData.imgURL,
    // },
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
    {
      type: "text",
      label: "Description",
      required: true,
      placeholder: "Book Description",
      name: "description",
      value: formData.description,
    },
    {
      type: "file",
      label: "Upload Image",
      required: edit ? false : true,
      name: "image",
      multiple: edit ? true : false,
      accept: "image/*",
    },
  ];
  const handleSaveBook = async (e) => {
    e.preventDefault();
    // console.log(e.target.image.files[0]);
    //  console.log(formData);
    const { image, ...data } = formData; //copy from formData except image
    //console.log(data);
    const form = new FormData();
    for (const key in data) {
      form.append(key, data[key]);
    }
    const imgs = e.target.image.files[0];
    form.append("image", imgs);

    //return;
    try {
      setSpinner(true);
      //  const toJson = JSON.stringify(form);
      const pendingResp = addBookAction(form);
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
      const imgSize = e.target.image.files.length;
      if (imgSize > 2) {
        alert("Two images are allowed to upload!");
        return;
      }
      const { image, ...data } = formData;
      data.imageList = data.imageList.filter((m) => {
        return isDel ? m !== imgDelPat : m;
      }); //remove path delete from imageList
      setIsDel(false);
      setImgDelPat(null);
      //setImgDelPat(null);
      const form = new FormData();
      for (const key in data) {
        form.append(key, data[key]);
      }
      Array.from(e.target.image.files).forEach((f) => form.append("image", f));

      setSpinner(true);
      // const pendingResp = updateBookAction(formData);
      // console.log([...form.entries()]);
      // return;
      imgURLSel !== null && form.set("imgURL", imgURLSel);

      //console.log(data);
      // console.log([...form.entries()]);
      //return;
      const pendingResp = updateBookAction(form);
      //promise is the behavior of pending
      toast.promise(pendingResp, { pending: "Please wait...." });
      const result = await pendingResp;
      if (result?.status === "success") {
        //  console.log(result);
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
  const handleImgSelect = (pat, k) => {
    if (imgSel === k) {
      // same selection again: deselect
      setImgSel(null);
      setImgDel(false);
    } else {
      // a different selection: select it and show the delete icon
      setImgSel(k);
      setImgDel(true);
      setImgDelPat(pat);
      setImgURLSel(pat);
    }
  };
  const handleDeleleImgs = async () => {
    const conf = confirm("Are you sure want to delete this image?");
    if (conf) {
      const data = {
        _id: book._id,
        path: imgDelPat,
        imageList: book.imageList,
      };
      const { status, message } = await bookImgDeleteAction(data);
      if (status === "success") {
        toast.success(message);
        setImgSel(null);
        setImgDel(false);
        setImgURLSel(null);

        dispatch(getAllBooksAction());
        setFormData(book);
        setIsDel(true);
      } else {
        toast.error(message);
      }
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
            {edit && (
              <div className="d-flex flex-column">
                <h4> Upload more images (Max 2) </h4>
                <div className="d-flex gap-2">
                  {book?.imageList?.map((im, k) => (
                    <span
                      key={im}
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      {imgDel && imgSel === k && (
                        <CiCircleRemove
                          style={{
                            position: "absolute",
                            top: -6,
                            right: -6,
                            color: "red",
                            background: "white",
                            borderRadius: "50%",
                            fontSize: 18,
                            cursor: "pointer",
                            zIndex: 1,
                          }}
                          onClick={handleDeleleImgs}
                        />
                      )}

                      <img
                        src={imgPath + "/images/" + im.split("/")[2]}
                        width={50}
                        height={55}
                        onClick={
                          im === book.imgURL
                            ? undefined
                            : () => handleImgSelect(im, k)
                        }
                        className={`${imgSel === k ? "setBgImg" : ""} ${im === book.imgURL ? "no-cursor" : "cursor-pointer"}`}
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}
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
