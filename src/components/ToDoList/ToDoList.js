import { useState } from "react";
import ReactTooltip from "react-tooltip";
import {
  Button,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import DeleteCross from "../../assets/icons/deleteСross.svg";

import styles from "./styles.module.scss";

const MainPage = () => {
  const [task, setTask] = useState("");
  const [toDoListTasks, setToDoListTasks] = useState([]);
  const [isShowTooltip, setIsShowTooltip] = useState(true);
  const handleChangeTaskText = (event) => {
    const newTaskText = event.target.value;
    setTask(newTaskText);
  };
  const handleAddTask = () => {
    setToDoListTasks((prevState) => {
      return [...prevState, task];
    });
    setTask("");
  };
  const handleDelete = (indexOfChosenTask) => {
    setToDoListTasks((prevState) => {
      return prevState.filter((task, index) => {
        return index !== indexOfChosenTask;
      });
    });
  };
  return (
    <>
      <InputGroup>
        <Form.Control
          data-tip
          data-for="input"
          onMouseEnter={() => setIsShowTooltip(true)}
          onMouseLeave={() => {
            setIsShowTooltip(false);
            setTimeout(() => setIsShowTooltip(true));
          }}
          value={task}
          onChange={handleChangeTaskText}
          type="text"
          placeholder="Add a new task"
          className={styles.inputGroup}
        />
        {isShowTooltip && task.split(" ").join("") === "" && (
          <ReactTooltip id="input" place="bottom" effect="solid">
            This field cannot be empty. Please enter a valid task
          </ReactTooltip>
        )}
        <Button
          disabled={task.split(" ").join("") === ""}
          variant="success"
          onClick={handleAddTask}
          className={styles.inputGroup}
        >
          Add
        </Button>
      </InputGroup>
      {toDoListTasks.length > 10 && (
        <div className={styles.error}>
          Warning. There are so many tasks in your To-Do List. Please remove at
          least{" "}
          {toDoListTasks.length - 10 === 1 ? (
            <span>1 task</span>
          ) : (
            <span>{toDoListTasks.length - 10} tasks</span>
          )}
          . Save your energy!
        </div>
      )}
      <ListGroup className={styles.listGroup}>
        <div>
          {toDoListTasks.map((task, index) => (
            <div id={task} key={index} className={styles.taskItem}>
              <ListGroupItem className={styles.taskText}>{task}</ListGroupItem>
              <div className={styles.deleteBinIcon}>
                <img
                  src={DeleteCross}
                  onClick={() => handleDelete(index)}
                  alt="deleteCross"
                />
              </div>
            </div>
          ))}
        </div>
      </ListGroup>
    </>
  );
};

export default MainPage;
