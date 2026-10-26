import { getAllBorrowsAction } from "../borrow/borrowAction";
import { insertReviewAPI } from "./reviewAPI";

export const insertReviewAction = (data, role) => async (dis) => {
  //console.log(data, "action");
  const { status, message } = await insertReviewAPI(data);
  status === "success" && dis(getAllBorrowsAction(role));
};
