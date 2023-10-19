import { useState, useEffect } from "react";

import PropTypes from "prop-types";

import { Button } from "react-bootstrap";

import styles from "./pagination.module.css";

function Pagination({ tasks, selectedPage, setSelectedPage }) {

    Pagination.propTypes = {
        tasks: PropTypes.arrayOf(
          PropTypes.shape({
            taskTitle: PropTypes.string,
            taskDescription: PropTypes.string,
            completed: PropTypes.bool,
          })
        ),
        selectedPage: PropTypes.number,
        setSelectedPage: PropTypes.func,
      };

  // Total number of pages
  const totalPages = Math.ceil(tasks?.length / 4);

  // All pages in array used in slicing to display the current page, two before and two after
  const [allPages, setAllPages] = useState([]);

  // The 3 displayed pages
  const [shownPages, setShownPages] = useState([]);


  useEffect(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    setAllPages(pages);
  }, [totalPages]);


  // Handles the 3 displayed pages
  useEffect(() => {
    if (selectedPage === 1) { // Handle the pagination display in the first page
      const visiblePages = allPages.slice(selectedPage - 1, selectedPage + 2);
      setShownPages(visiblePages);
    }else if (selectedPage === 2) { // Handle the pagination display in the second page
        const visiblePages = allPages.slice(selectedPage - 2, selectedPage + 1);
        setShownPages(visiblePages);
      } else if (selectedPage === totalPages) { // Handle the pagination display in the last page
      const visiblePages = allPages.slice(selectedPage - 3, selectedPage);
      setShownPages(visiblePages);
    } else { // Handle the pagination display in the inbetween pages
      const visiblePages = allPages.slice(selectedPage - 2, selectedPage + 1);
      setShownPages(visiblePages);
    }
  }, [allPages, selectedPage, totalPages]);


  const previousPageClick = () => {
    if (selectedPage > 1) {
      setSelectedPage(selectedPage - 1);
    }
  };

  const nextPageClick = () => {
    if (selectedPage < totalPages) {
      setSelectedPage(selectedPage + 1);
    }
  };

  const buttonClick = (page) => {
    setSelectedPage(page);
  };

  return (
    <>
    {tasks?.length > 0 && (
      <div className={styles.buttonsDiv}>
      <span onClick={previousPageClick}>
        <Button variant="success">Prev</Button>
      </span>
      {shownPages?.map((page) => {
        return (
          <span key={page} onClick={() => buttonClick(page)}>
            <Button variant="success" style={{backgroundColor: selectedPage===page && "#345D30"}}>{page}</Button>
          </span>
        );
      })}
      <span onClick={nextPageClick}>
        <Button variant="success">Next</Button>
      </span>
  </div>
    )}
    </>
  );
}

export default Pagination;
