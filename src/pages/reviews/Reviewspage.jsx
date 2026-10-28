import React from "react";
import { Alert, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const Reviewspage = () => {
  const review = useSelector((state) => state.reviewInfo.reviews);

  return (
    <div>
      <h3>All Reviews</h3>
      <Table
        striped
        bordered
        hover
        responsive
        className="mb-0 align-middle fs-5 text-center table-spaced"
        style={{ minWidth: "800px" }}
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
                <td>
                  {rew.reviewMessage}
                  <br />
                  star:
                </td>
                <td>Approve | Delete</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>
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
