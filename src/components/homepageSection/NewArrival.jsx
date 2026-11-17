import React from "react";
import SectionTitles from "../sectionTitle/SectionTitles";
import { useSelector } from "react-redux";
import CustomCard from "../../pages/home/CustomCard";

const NewArrival = () => {
  const bookCollection = useSelector(
    (state) => state.bookInfo.bookCollection,
  ).filter((book, key) => key <= 3 && book);

  return (
    <div>
      <SectionTitles title="New Arrivals" />
      <CustomCard bookCollection={bookCollection} />
    </div>
  );
};

export default NewArrival;
