import { useState } from "react";

import { useForm } from "react-hook-form";

import PropTypes from "prop-types";

import { Button, Form } from "react-bootstrap";

import styles from "./addTask.module.css";

function AddTask({ setTasks, tasksRef, cacheData, setCacheData }) {

  AddTask.propTypes = {
    setTasks: PropTypes.func,
    tasksRef: PropTypes.object,
    cacheData: PropTypes.bool,
    setCacheData: PropTypes.func,
  };

  const [addTask, setAddTask] = useState(false); // Responsible for displaying the adding task div

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {
    tasksRef.current = [
      ...(tasksRef.current || []),
      {
        taskTitle: data.taskTitle,
        taskDescription: data.taskDescription,
        completed: false,
      },
    ];
    setTasks(tasksRef.current);

    setAddTask(false);

    setValue("taskTitle", null);
    setValue("taskDescription", null);

    setCacheData(!cacheData)
  };

  return (
    <div className={styles.newTaskDiv}>
      <div className={styles.newTaskButtonDiv}>
        <Button
          variant="success"
          onClick={() => setAddTask((prev) => !prev)}
          className={styles.newTaskButton}
        >
          <span>Add new task </span>
          <span>
            {addTask ? (
              <i className="fas fa-chevron-up" />
            ) : (
              <i className="fas fa-chevron-down" />
            )}
          </span>
        </Button>
      </div>

      {addTask && (
        <div className={styles.newTaskInputsDiv}>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Form.Control
                {...register("taskTitle", { required: true })}
                type="text"
                placeholder="Task Title"
                className={styles.taskInput}
              />
              {errors.taskTitle?.type === "required" && (
                <p className={styles.errorMsg}>Title is required</p>
              )}

              <Form.Control
                {...register("taskDescription", { required: true })}
                type="text"
                placeholder="Task Description"
                className={styles.taskInput}
              />
              {errors.taskDescription?.type === "required" && (
                <p className={styles.errorMsg}>Description is required</p>
              )}

              <Button type="submit" variant="success">
                Add
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTask;
