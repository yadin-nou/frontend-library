import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooksAction } from "../../features/book/bookAction";
import { getAllUserAction } from "../../features/user/userAction";
import { getAllBorrowsAction } from "../../features/borrow/borrowAction";
import { useLocation } from "react-router-dom";
import { getAllReviewAction } from "../../features/review/reviewAction";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const book = useSelector((state) => state.bookInfo.bookCollection);
  const members = useSelector((state) => state.userInfo.allUsers);
  const { user } = useSelector((state) => state.userInfo);
  const review = useSelector((state) => state.reviewInfo.reviews);
  // const borrows = useSelector((state) => state.borrowInfo.allBorrows);
  // const location = useLocation();
  // const path = location.pathname.split("/").at(-1);
  const { allBorrows, myBorrows } = useSelector((state) => state.borrowInfo);
  // const borrows =
  //   user?.role === "admin"
  //     ? allBorrows
  //     : myBorrows?.filter((bo) => {
  //         return bo.userId?.email === user?.email;
  //       });
  const borrows =
    user?.role === "admin"
      ? Array.isArray(allBorrows)
        ? allBorrows
        : []
      : (Array.isArray(myBorrows) ? myBorrows : []).filter(
          (bo) => bo.userId?._id === user?._id,
        );
  const role = user?.role === "admin" ? "admin" : "user";
  const isAdmin = user?.role === "admin";
  // console.log("All Borrows", user?.email, allBorrows);
  // console.log("My borrow", user?.email, myBorrows);
  const getMonthly = (borrows = [], months = 6) => {
    const now = new Date();
    const buckets = [];

    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      buckets.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        label: d.toLocaleString("en-AU", { month: "short" }),
        count: 0,
      });
    }

    borrows.forEach((b) => {
      const d = new Date(b.createdAt); // or your borrow date field
      if (isNaN(d)) return;
      const bucket = buckets.find(
        (x) => x.key === `${d.getFullYear()}-${d.getMonth()}`,
      );
      if (bucket) bucket.count += 1;
    });

    return buckets;
  };
  // console.log(getMonthly(borrows));
  useEffect(() => {
    dispatch(getAllBooksAction());
    isAdmin && dispatch(getAllUserAction());
  }, []);
  useEffect(() => {
    dispatch(getAllBorrowsAction(role));
  }, [role]);
  useEffect(() => {
    dispatch(getAllReviewAction(isAdmin));
  }, [dispatch, isAdmin]);

  // console.log(borrows, "-----", role);

  return (
    <div>
      <Dashboard
        stats={book}
        members={isAdmin ? members : [user]}
        borrows={borrows}
        isAdmin={role}
        reviews={review}
        monthly={getMonthly(borrows)}
      />
    </div>
  );
};

export default DashboardPage;
