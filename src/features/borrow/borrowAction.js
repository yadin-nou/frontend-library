import { toast } from "react-toastify";
import { getAllBorrowsApi, returnBookAPI } from "./borrowAPI";
import { setAllBorrow, setMyBorrow } from "./borrowSlice";

export const getAllBorrowsAction = (role) => async (dis) => {
  const pending = getAllBorrowsApi(role);
  toast.promise(pending, { pending: "Please wait..." });
  const { status, message, payload } = await pending;
  role === "admin" ? dis(setAllBorrow(payload)) : dis(setMyBorrow(payload));
};
export const returnBookAction = (data, role) => async (dis) => {
  const pendingResult = returnBookAPI(data);
  toast.promise(pendingResult, { pending: "Please wait...." });
  const { status, message } = await pendingResult;
  toast[status](message);
  status === "success" && dis(getAllBorrowsAction(role));
};
