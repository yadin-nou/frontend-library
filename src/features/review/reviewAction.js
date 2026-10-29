import { toast } from "react-toastify";
import { getAllBorrowsAction } from "../borrow/borrowAction";
import {
  deleteReviewAPI,
  getAllReviewAPI,
  insertReviewAPI,
  updateApprovedReviewAPI,
} from "./reviewAPI";
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

export const deleteReviewAction = async (data) => {
  const pending = deleteReviewAPI(data);
  toast.promise(pending, { pending: "Please wait..." });
  const result = await pending;
  return result;
};

export const updateApproveReviewAction = async (data) => {
  const pending = updateApprovedReviewAPI(data);
  toast.promise(pending, { pending: "Please wait..." });
  const result = await pending;
  return result;
};
