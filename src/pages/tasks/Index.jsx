import { useState, useRef } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AddTask from "./components/add-task/AddTask";
import SearchBar from "./components/search-bar/SearchBar";
import SingleTask from "./components/single-task/SingleTask";

import styles from "./index.module.css"

function Tasks() {

  const tasksRef = useRef([])  // Used to store the whole tasks
  const [tasks, setTasks] = useState([]);  // Used to display tasks, to handle the user's search

  const handleDeletingTask = (taskIndex) => {
    const removingTask = tasks.filter((task, index) => {
        return index !== taskIndex
    })

    setTasks(removingTask)
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

  return (
    <main>
      <h2 className={styles.taskHeader}>Manage your tasks</h2>

      <AddTask tasks={tasks} setTasks={setTasks} tasksRef={tasksRef} />

      <SearchBar tasks={tasks} setTasks={setTasks} tasksRef={tasksRef} />

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
