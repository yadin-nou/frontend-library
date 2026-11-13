import { Row, Col, Card, Table, Badge } from "react-bootstrap";

const statusVariant = {
  borrowed: "primary",
  overdue: "danger",
  returned: "success",
};
const status = (isReturned, date) => {
  if (isReturned) {
    return "returned";
  } else {
    const today = new Date();
    if (formatDate(date) > today) {
      return "overdue";
    } else {
      return "borrowed";
    }
  }
};
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "short",
      })
    : "-";

const StatCard = ({ label, value }) => (
  <Card className="h-100 bg-light border-0">
    <Card.Body className="py-3">
      <div className="text-muted small">{label}</div>
      <div className="fs-3 fw-medium">{value ?? 0}</div>
    </Card.Body>
  </Card>
);

const Dashboard = ({
  stats = {},
  members = [],
  monthly = [],
  reviews = [],
  borrows = [],
  isAdmin = "admin",
}) => {
  const max = Math.max(1, ...monthly.map((m) => m.count));
  const reviewNotApproved = reviews.filter((rev) => rev.isApproved === false);
  console.log(borrows);
  return (
    <div className="w-100">
      <Row className="g-3 mb-3">
        <Col xs={6} md={3}>
          <StatCard label="Total books" value={stats.length} />
        </Col>

        <Col xs={6} md={3}>
          <StatCard
            label="Members"
            value={
              members.length === 1
                ? formatDate(members[0].createdAt)
                : members.length
            }
          />
        </Col>

        <Col xs={6} md={3}>
          <StatCard
            label="Active borrows"
            value={borrows.filter((bo) => bo.isReturned === false).length}
          />
        </Col>

        <Col xs={6} md={3}>
          <StatCard label="Pending reviews" value={reviewNotApproved.length} />
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col xs={12} lg={8}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="fs-6">Borrows per month</Card.Title>
              <div
                className="d-flex align-items-end gap-3 mt-3"
                style={{ height: 120 }}
              >
                {monthly.map((m) => (
                  <div
                    key={m.label}
                    className="flex-fill d-flex flex-column align-items-center justify-content-end h-100"
                  >
                    <div
                      title={`${m.label}: ${m.count}`}
                      style={{
                        width: "100%",
                        maxWidth: 28,
                        height: `${(m.count / max) * 100}%`,
                        background: "#378ADD",
                        borderRadius: "4px 4px 0 0",
                      }}
                    />
                    <small className="text-muted mt-1">{m.label}</small>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="fs-6">Reviews</Card.Title>
              {reviewNotApproved.length === 0 ? (
                <div className="text-muted small">Nothing to review</div>
              ) : (
                reviewNotApproved.slice(0, 5).map((r) => (
                  <div
                    key={r._id}
                    className="d-flex justify-content-between gap-2 py-1 small"
                  >
                    <span className="text-truncate">
                      {r.title.slice(0, 9)}..
                    </span>
                    <span className="text-muted text-nowrap">
                      {r.rating} stars
                    </span>
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <Card.Title className="fs-6">Recent borrows</Card.Title>
          <Table responsive hover className="mb-0 align-middle">
            <thead>
              <tr>
                <th>Member</th>
                <th>Book</th>
                <th>Due</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {borrows?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-muted py-3">
                    No borrows Yet
                  </td>
                </tr>
              ) : (
                borrows?.slice(0, 7).map((b) => (
                  <tr key={b._id}>
                    <td>
                      {b.userId.fName} {b.userId.lName}
                    </td>
                    <td>{b.bookTitle}</td>
                    <td>{formatDate(b.dueDate)}</td>
                    <td>
                      <Badge
                        bg={statusVariant[status(b.isReturned, b.dueDate)]}
                      >
                        {status(b.isReturned, b.dueDate)}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dashboard;
