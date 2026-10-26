import { getAllBorrowsAction } from "../borrow/borrowAction";
import { insertReviewAPI } from "./reviewAPI";

export const insertReviewAction = (data, role) => async (dis) => {
  //console.log(data, "action");
  const result = await insertReviewAPI(data);
  result?.status === "success" && dis(getAllBorrowsAction(role));
  return result;
};
