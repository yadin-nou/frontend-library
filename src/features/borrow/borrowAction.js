import { toast } from "react-toastify";
import { getAllBorrowsApi } from "./borrowAPI";
import { setAllBorrow } from "./borrowSlice";

export const getAllBorrowsAction = () => async (dis) => {
  const pending = getAllBorrowsApi();
  toast.promise(pending, { pending: "Please wait..." });
  const { status, message, payload } = await pending;
  // console.log(payload);
  dis(setAllBorrow(payload));
};
