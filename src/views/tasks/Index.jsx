import { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

import AddTask from "./components/add-task/AddTask";
import FilteringAndSorting from "./components/filtering-and-sorting/FilteringAndSorting";
import SingleTask from "./components/single-task/SingleTask";
import Pagination from "./components//pagination/Pagination";

import styles from "./index.module.css"

function Tasks() {
  const cachedTasks = JSON.parse(window.localStorage.getItem("tasks"))
  const tasksRef = useRef(cachedTasks || [])  // Used to store the whole tasks
  const [tasks, setTasks] = useState(cachedTasks || []);  // Used to display tasks, to handle the user's search

  const [selectedPage, setSelectedPage] = useState(1);  // The selected page

  const displayedTasks = tasks?.slice((selectedPage - 1) * 4, ((selectedPage - 1) * 4) + 4);  // Handle the displayed items according to the pagination

  const [cacheData, setCacheData] = useState(true);  // Responsible for caching the latest data on every change

  
  // Handles caching
  useEffect(() => {
    if (tasks.length > 0) {
      window.localStorage.setItem("tasks", JSON.stringify(tasksRef.current))
    }
  }, [cacheData]);


  const handleDeletingTask = (taskIndex) => {
    const removingTask = tasksRef.current.filter((task, index) => {
        return index !== taskIndex
    })

    tasksRef.current = removingTask
    setTasks(tasksRef.current)

    setCacheData(!cacheData)
  }

  const handleTaskPending = (taskIndex) => {
    setTasks(prev => {
      const updatedStatusTasks = [...prev];
      updatedStatusTasks[taskIndex].completed = false;
      return updatedStatusTasks;
    });

    setCacheData(!cacheData)
  }

  const handleTaskCompleted = (taskIndex) => {
    setTasks(prev => {
      const updatedStatusTasks = [...prev];
      updatedStatusTasks[taskIndex].completed = true;
      return updatedStatusTasks;
    });

    setCacheData(!cacheData)
  }

  const handleEditingTitle = (e, taskIndex) => {
    setTasks(prev => {
      const updatedStatusTasks = [...prev];
      updatedStatusTasks[taskIndex].taskTitle = e.target.value;
      return updatedStatusTasks;
    });

    setCacheData(!cacheData)
  }

  const handleEditingDescription = (e, taskIndex) => {
    setTasks(prev => {
      const updatedStatusTasks = [...prev];
      updatedStatusTasks[taskIndex].taskDescription = e.target.value;
      return updatedStatusTasks;
    });

    setCacheData(!cacheData)
  }

  const handleLogout = () => {

    window.localStorage.removeItem("role")
  }

  return (
    <main className={styles.tasksMain}>
      
      <div className={styles.logoutDiv}>
      <Button variant="success" onClick={handleLogout}>
        <Link to="/" style={{textDecoration:"none", color:"white"}}>Log Out</Link>
        </Button>
      </div>

      <h2 className={styles.taskHeader}>Manage your tasks</h2>

      <AddTask tasks={tasks} setTasks={setTasks} tasksRef={tasksRef} cacheData={cacheData} setCacheData={setCacheData} />

      <FilteringAndSorting tasks={tasks} setTasks={setTasks} tasksRef={tasksRef} />

      <Container fluid className={styles.tasksContainer}>
        <Row className={styles.taskRow}>
          {displayedTasks?.map((task, index) => {
            return (
              <Col key={index} lg={6} className={styles.taskColumn}>
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

      <Pagination tasks={tasks} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
    </main>
  );
}

export default Tasks;
