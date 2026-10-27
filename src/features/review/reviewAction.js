import { toast } from "react-toastify";
import { getAllBorrowsAction } from "../borrow/borrowAction";
import { getAllReviewAPI, insertReviewAPI } from "./reviewAPI";
import { setAllReview } from "./reviewSlice";

export const insertReviewAction = (data, role) => async (dis) => {
  //console.log(data, "action");
  const result = await insertReviewAPI(data);
  result?.status === "success" && dis(getAllBorrowsAction(role));
  return result;
};

export const getAllReviewAction = (isAdmin) => async (dis) => {
  //console.log(isAdmin, "action");
  const pending = getAllReviewAPI(isAdmin);
  toast.promise(pending, { pending: "Please wait..." });
  const { status, payload } = await pending;
  status === "success" && dis(setAllReview(payload));
};
