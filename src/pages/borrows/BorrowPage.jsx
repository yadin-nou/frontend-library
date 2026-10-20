import React from "react";
import { Table } from "react-bootstrap";

function BorrowPage() {
  return (
    <div>
      <h3>All Borrows</h3>
      <Table
        striped
        bordered
        hover
        responsive
        className="mb-0 align-middle fs-5 text-center table-spaced"
      >
        <thead className="bg-light">
          <tr>
            <th className="d-none d-md-table-cell">#</th>
            <th>Thumbnail</th>
            <th>Due</th>
            <th>Returned Date</th>
            <th className="d-none d-md-table-cell">Actions</th>
            <th className="d-none d-md-table-cell">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="d-none d-md-table-cell"></td>
            <td></td>
            <td className="text-secondary"></td>
            <td></td>
            <td className="d-none d-md-table-cell"></td>
            <td className="d-none d-md-table-cell"></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default BorrowPage;
