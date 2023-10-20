import { useState } from "react";

import PropTypes from "prop-types";

import { Button, Form } from "react-bootstrap";
import styles from "./singleTask.module.css";

function SingleTask({
  taskTitle,
  taskDescription,
  taskCompleted,
  handleDeletingTask,
  handleTaskPending,
  handleTaskCompleted,
  handleEditingTitle,
  handleEditingDescription
}) {
  SingleTask.propTypes = {
    taskTitle: PropTypes.string,
    taskDescription: PropTypes.string,
    taskCompleted: PropTypes.bool,
    handleDeletingTask: PropTypes.func,
    handleTaskPending: PropTypes.func,
    handleTaskCompleted: PropTypes.func,
    handleEditingTitle: PropTypes.func,
    handleEditingDescription: PropTypes.func,
  };

  const [isEditing, setIsEditing] = useState(false);

  // Still need editing the task

  return (
    <section className={styles.singleTaskSection}>
      <div>
        <button onClick={handleDeletingTask} className={styles.removingButton}>
          x
        </button>

        <div className={styles.titleContainer}>
          {isEditing ? (
            <Form.Control
              value={taskTitle}
              onChange={(e) => handleEditingTitle(e)}
              className="edit_input"
            />
          ) : (
            <h5
              className={styles.taskTitle}
              style={{ textDecoration: taskCompleted && "line-through" }}
            >
              {taskTitle}
            </h5>
          )}

          {/* colored status */}
          <div
            style={{ backgroundColor: taskCompleted ? "#1d9027" : "#c21414" }}
            className={styles.statusDiv}
          ></div>

          {/* signed status */}
          <span className={styles.statusIcon}>
            {taskCompleted ? (
              <i
                className="fa-regular fa-circle-xmark"
                onClick={handleTaskPending}
                style={{ color: "#c21414" }}
              />
            ) : (
              <i
                className="fa-regular fa-circle-check"
                onClick={handleTaskCompleted}
                style={{ color: "#1d9027" }}
              />
            )}
          </span>

          {isEditing ? (
            <Button variant="secondary" style={{ paddingBlock: "0" }} onClick={() => setIsEditing(false)}>
              Save
            </Button>
          ) : (
            <Button variant="secondary" style={{ paddingBlock: "0" }} onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>
      </div>

      {isEditing ? (
        <Form.Control
        value={taskDescription}
        onChange={(e) => handleEditingDescription(e)}
        className="edit_input"
      />
      ) : (
        <p
        style={{ textDecoration: taskCompleted && "line-through" }}
        className={styles.taskDescription}
      >
        {taskDescription}
      </p>
      )}
      
    </section>
  );
}

export default SingleTask;
