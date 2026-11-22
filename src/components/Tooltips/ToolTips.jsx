import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const ToolTips = ({ text, placement = "right", children }) => (
  <OverlayTrigger
    placement={placement}
    popperConfig={{ strategy: "fixed" }}
    overlay={<Tooltip id={`tooltip-${text}`}>{text}</Tooltip>}
  >
    <span className="d-flex justify-content-center w-100">{children}</span>
  </OverlayTrigger>
);

export default ToolTips;
