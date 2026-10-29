import { useEffect } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { renderStars } from "../../utils/starRating";
import { getAllReviewAction } from "../../features/review/reviewAction";

const Reviewspage = () => {
  const review = useSelector((state) => state.reviewInfo.reviews);
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const isAdmin = user?.role === "admin";
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
                  Title:{rew.title}
                  <br />
                  Message: {rew.reviewMessage}
                  <br />
                  Rating: {renderStars(rew.rating)}
                  <br />
                  <Button variant="danger" size="sm" className="mt-2">
                    Delete
                  </Button>
                </td>
                <td>
                  <Button variant="warning">Approve now?</Button>
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
