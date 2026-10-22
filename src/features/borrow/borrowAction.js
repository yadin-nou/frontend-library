import { toast } from "react-toastify";
import { getAllBorrowsApi } from "./borrowAPI";
import { setAllBorrow, setMyBorrow } from "./borrowSlice";

export const getAllBorrowsAction = (role) => async (dis) => {
  const pending = getAllBorrowsApi(role);
  toast.promise(pending, { pending: "Please wait..." });
  const { status, message, payload } = await pending;
  role === "admin" ? dis(setAllBorrow(payload)) : dis(setMyBorrow(payload));
};
