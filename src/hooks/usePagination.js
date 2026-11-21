import { useEffect } from "react";
import { useState } from "react";

const usePagination = (data, numberPerPage) => {
  // page pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / numberPerPage);

  // Calculate the indexes of the books to display
  const indexOfLastData = currentPage * numberPerPage;
  const indexOfFirstData = indexOfLastData - numberPerPage;

  // Get books for the current page
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return {
    currentData,
    currentPage,
    totalPages,
    numberPerPage,
    indexOfFirstData,
    indexOfLastData,
    handlePagination: (e) => handlePagination(e),
  };
};

export default usePagination;
