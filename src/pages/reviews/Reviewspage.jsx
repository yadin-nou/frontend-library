import React from "react";
import { useSelector } from "react-redux";

const Reviewspage = () => {
  const review = useSelector((state) => state.reviewInfo);
  console.log(review.reviews);
  return <div>Reviewspage</div>;
};

export default Reviewspage;
