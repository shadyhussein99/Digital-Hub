import { Form } from "react-bootstrap";

import PropTypes from "prop-types";

function SearchBar({ setTasks, tasksRef }) {

  SearchBar.propTypes = {
    setTasks: PropTypes.func.isRequired,
    tasksRef:PropTypes.object.isRequired
  };

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
    </div>
  );
}

export default SearchBar;
