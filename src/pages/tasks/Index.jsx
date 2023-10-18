import { useState, useRef } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AddTask from "./components/add-task/AddTask";
import FilteringAndSorting from "./components/filtering-and-sorting/FilteringAndSorting";
import SingleTask from "./components/single-task/SingleTask";

import styles from "./index.module.css"

function Tasks() {

  const tasksRef = useRef([])  // Used to store the whole tasks
  const [tasks, setTasks] = useState([]);  // Used to display tasks, to handle the user's search

  const handleDeletingTask = (taskIndex) => {
    const removingTask = tasksRef.current.filter((task, index) => {
        return index !== taskIndex
    })

    tasksRef.current = removingTask
    setTasks(tasksRef.current)
  }

  const handleTaskPending = (taskIndex) => {
    setTasks(prev => {
      const updatedStatusTasks = [...prev];
      updatedStatusTasks[taskIndex].completed = false;
      return updatedStatusTasks;
    });
  }

  const handleTaskCompleted = (taskIndex) => {
    setTasks(prev => {
      const updatedStatusTasks = [...prev];
      updatedStatusTasks[taskIndex].completed = true;
      return updatedStatusTasks;
    });
  }

  const handleEditingTitle = (e, taskIndex) => {
    setTasks(prev => {
      const updatedStatusTasks = [...prev];
      updatedStatusTasks[taskIndex].taskTitle = e.target.value;
      return updatedStatusTasks;
    });
  }

  const handleEditingDescription = (e, taskIndex) => {
    setTasks(prev => {
      const updatedStatusTasks = [...prev];
      updatedStatusTasks[taskIndex].taskDescription = e.target.value;
      return updatedStatusTasks;
    });
  }

  return (
    <main className={styles.tasksMain}>
      <h2 className={styles.taskHeader}>Manage your tasks</h2>

      <AddTask tasks={tasks} setTasks={setTasks} tasksRef={tasksRef} />

      <FilteringAndSorting tasks={tasks} setTasks={setTasks} tasksRef={tasksRef} />

      <Container fluid className={styles.tasksContainer}>
        <Row className={styles.taskRow}>
          {tasks?.map((task, index) => {
            return (
              <Col key={index} sm={6} className={styles.taskColumn}>
                <SingleTask
                  taskTitle={task.taskTitle}
                  taskDescription={task.taskDescription}
                  taskCompleted={task.completed}
                  handleDeletingTask={() => handleDeletingTask(index)}
                  handleTaskPending={() => handleTaskPending(index)}
                  handleTaskCompleted={() => handleTaskCompleted(index)}
                  handleEditingTitle={(e) => handleEditingTitle(e, index)}
                  handleEditingDescription={(e) => handleEditingDescription(e, index)}
                />
              </Col>
            );
          })}

        </Row>
      </Container>
    </main>
  );
}

export default Tasks;
