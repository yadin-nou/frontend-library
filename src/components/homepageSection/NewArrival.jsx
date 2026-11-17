import React from "react";
import SectionTitles from "../sectionTitle/SectionTitles";
import { useSelector } from "react-redux";
import CustomCard from "../../pages/home/CustomCard";

const NewArrival = () => {
  const bookCollection = useSelector((state) => state.bookInfo.bookCollection);
  return (
    <div>
      <SectionTitles title="New Arrival" />
      <CustomCard bookCollection={bookCollection} />
    </div>
  );
};

export default NewArrival;
