import { useState } from "react";

import { Button, Form } from "react-bootstrap";

import styles from "./filteringAndSorting.module.css";

import PropTypes from "prop-types";

function FilteringAndSorting({ tasks, setTasks, tasksRef }) {
  FilteringAndSorting.propTypes = {
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        taskTitle: PropTypes.string,
        taskDescription: PropTypes.string,
        completed: PropTypes.bool,
      })
    ),
    setTasks: PropTypes.func,
    tasksRef: PropTypes.object,
  };

  const [sortedByNewest, setSortedByNewest] = useState(true);

  const handleSortByOldest = () => {
    setSortedByNewest(false);

    const sortTasksByOldest = [...tasks].reverse();
    setTasks(sortTasksByOldest)
  };

  const handleSortByNewest = () => {
    setSortedByNewest(true);

    const sortTasksByNewest = [...tasks].reverse();
    setTasks(sortTasksByNewest)
  };

  const handleClearTasks = () => {
    tasksRef.current = null
    setTasks([])
  }

  const handleSearchingTasks = (e) => {
    // Debouncing
    const debounceResults = setTimeout(() => {
      const inputValue = e.target.value.trim(); // trim to not remove the spaces at the beginning, if the user started typing with space

      const searchedTasks = tasksRef.current?.filter((task) => {
        return task.taskTitle.toLowerCase().includes(inputValue.toLowerCase());
      });
      setTasks(searchedTasks);
    }, 600);

    return () => clearTimeout(debounceResults);
  };

  return (
    <div>
      <Form.Control
        onChange={handleSearchingTasks}
        type="text"
        placeholder="Search your tasks by Title"
      />

      {tasks?.length > 0 && (
        <div className={styles.sortingDiv}>
          {sortedByNewest ? (
            <Button variant="success" onClick={handleSortByOldest}>
              Sorted By Newest &darr;
            </Button>
          ) : (
            <Button variant="success" onClick={handleSortByNewest}>
              Sorted By Oldest &uarr;
            </Button>
          )}

          <Button variant="secondary" onClick={handleClearTasks}>Clear</Button>
        </div>
      )}
    </div>
  );
}

export default FilteringAndSorting;
