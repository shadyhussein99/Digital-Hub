import PropTypes from "prop-types";

import styles from "./singleTask.module.css";

function SingleTask({
  taskTitle,
  taskDescription,
  taskCompleted,
  handleDeletingTask,
  handleTaskPending,
  handleTaskCompleted,
}) {
  
  SingleTask.propTypes = {
    taskTitle: PropTypes.string.isRequired,
    taskDescription: PropTypes.string.isRequired,
    taskCompleted: PropTypes.bool.isRequired,
    handleDeletingTask: PropTypes.func.isRequired,
    handleTaskPending: PropTypes.func.isRequired,
    handleTaskCompleted: PropTypes.func.isRequired,
  };

  // Still need editing the task

  return (
    <section className={styles.singleTaskSection}>
      <div>
        <button onClick={handleDeletingTask} className={styles.removingButton}>
          x
        </button>

        <div className={styles.titleContainer}>
          <h5
            className={styles.taskTitle}
            style={{ textDecoration: taskCompleted && "line-through" }}
          >
            {taskTitle}
          </h5>
          <div
            style={{ backgroundColor: taskCompleted ? "#1d9027" : "#c21414" }}
            className={styles.statusDiv}
          ></div> {/* colored status */}
          
          <span className={styles.statusIcon}> {/* signed status */}
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
        </div>
      </div>
      <p style={{ textDecoration: taskCompleted && "line-through" }}>
        {taskDescription}
      </p>
    </section>
  );
}

export default SingleTask;
