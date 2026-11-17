import SectionTitles from "../sectionTitle/SectionTitles";
import { useSelector } from "react-redux";
import CustomCard from "../../pages/home/CustomCard";
import { useMemo } from "react";
const BestRead = () => {
  //   const bookCollection = useSelector(
  //     (state) => state.bookInfo.bookCollection,
  //   ).filter((book, key) => key <= 3 && Number(book.averageRating) > 4.3);
  const books = useSelector((state) => state.bookInfo.bookCollection);

  const topBooks = useMemo(
    () =>
      (Array.isArray(books) ? books : [])
        .filter((book) => Number(book.averageRating) > 4.3)
        .sort((a, b) => Number(b.averageRating) - Number(a.averageRating))
        .slice(0, 4),
    [books],
  );
  return (
    <div>
      <SectionTitles title="Best Read" />
      <CustomCard bookCollection={topBooks} />
    </div>
  );
};

export default BestRead;
