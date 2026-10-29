import { useEffect } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { renderStars } from "../../utils/starRating";
import {
  deleteReviewAction,
  getAllReviewAction,
  updateApproveReviewAction,
} from "../../features/review/reviewAction";
import { toast } from "react-toastify";

const Reviewspage = () => {
  const review = useSelector((state) => state.reviewInfo.reviews);
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const isAdmin = user?.role === "admin";

  const handleDeleteReview = async (_id) => {
    const conf = confirm("Are you sure want to delete this Review?");
    if (conf) {
      const { status, message } = await deleteReviewAction({ _id });
      if (status === "success") dispatch(getAllReviewAction(isAdmin));
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleUpdateApprove = async (_id, isApproved) => {
    const { status, message } = await updateApproveReviewAction({
      _id,
      isApproved,
    });
    if (status === "success") {
      dispatch(getAllReviewAction(isAdmin));
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  useEffect(() => {
    dispatch(getAllReviewAction(isAdmin));
  }, [dispatch, isAdmin]);
  return (
    <div>
      <h3>All Reviews</h3>
      <Table
        striped
        bordered
        hover
        responsive
        className="mb-0 align-middle text-center table-spaced"
        style={{ minWidth: "450px" }}
      >
        <thead className="bg-light">
          <tr>
            <th className="d-none d-md-table-cell">#</th>
            <th>Book</th>
            <th>Review</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {review.length > 0 ? (
            review.map((rew, k) => (
              <tr key={k + 1}>
                <td className="d-none d-md-table-cell">{k + 1}</td>
                <td style={{ cursor: "pointer" }}>
                  {rew.bookId.title}
                  <br />
                  <img
                    src={rew.bookId.imgURL}
                    alt={rew.bookId.title}
                    style={{ width: 50 }}
                  />
                </td>
                <td className="text-start">
                  Status:{" "}
                  {rew.isApproved ? (
                    <span style={{ color: "green" }}>Approved</span>
                  ) : (
                    <span style={{ color: "red" }}>Not Approved</span>
                  )}{" "}
                  <br />
                  Title:{rew.title}
                  <br />
                  Message: {rew.reviewMessage}
                  <br />
                  Rating: {renderStars(rew.rating)}
                  <br />
                  <Button
                    variant="danger"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleDeleteReview(rew._id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  {rew.isApproved ? (
                    <Button
                      variant="success"
                      onClick={() =>
                        handleUpdateApprove(rew._id, !rew.isApproved)
                      }
                    >
                      Approved
                    </Button>
                  ) : (
                    <Button
                      variant="warning"
                      onClick={() =>
                        handleUpdateApprove(rew._id, rew.isApproved)
                      }
                    >
                      Not Approved
                    </Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <Alert variant="warning">No Review Avaiable</Alert>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Reviewspage;
