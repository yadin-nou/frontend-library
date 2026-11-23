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
  try {
    const pending = getAllReviewAPI(isAdmin);

    toast.promise(pending, {
      pending: "Please wait...",
    });

    const result = await pending;

    //console.log("Get all reviews API:", result);

    if (result?.status === "success") {
      dis(setAllReview(result.payload));
    } else {
      dis(setAllReview(result.payload));
      console.log(result, "in Action");
    }

    return result;
  } catch (error) {
    console.error("Get reviews error:", error);
    throw error;
  }
};

export const deleteReviewAction = async (data) => {
  const pending = deleteReviewAPI(data);
  toast.promise(pending, { pending: "Please wait..." });
  const result = await pending;
  return result;
};

export const updateApproveReviewAction = async (data) => {
  const result = await updateApprovedReviewAPI(data);
  // toast.promise(pending, { pending: "Please wait..." });
  //const result = await pending;
  return result;
};
