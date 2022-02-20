import "./App.scss";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Container,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    getTask();
  }, []);

  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState({
    name: "",
    check: false
  });

  const url =
    "https://my-json-server.typicode.com/sametsunman/mockapi-todo-list/tasks/";

  const getTask = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => taskOperation("get",data));
  };

  const postTask = (task) => {
    fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => taskOperation("create",data));
  };

  const deleteTask = (id) => {
    fetch(url + id, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => response.json())
      .then((data) => taskOperation("delete",id));
  };

  const putTask = (id, task) => {
    fetch(url + id, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => taskOperation("update",task));
  };

  const taskOperation = (type, value) => {
    switch (type) {
      case "get":
        setTasks(value);
        break;
      case "create":
        setTasks([...tasks, value]);
        setNewTask({
          name: "",
          check: false,
        });
        break;
      case "update":
        setTasks(tasks.map((task) => task.id === value.id ? value : task));
        break;
      case "delete":
        setTasks(tasks.filter((task) => task.id !== value));
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      <Box>
        <h1 className="title">ToDo List</h1>
        <div className="new-task">
          <TextField
            className="new-input"
            id="newTask"
            label="New Task"
            variant="outlined"
            value={newTask.name}
            onChange={(event) =>
              setNewTask({ ...newTask, name: event.target.value })
            }
          />
          <Button
            className="new-button"
            size="large"
            variant="contained"
            onClick={() => {
              postTask(newTask);
            }}
          >
            Add
          </Button>
        </div>
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id} className="list-item">
              <Checkbox
                checked={task.check}
                onChange={() =>
                  putTask(task.id, { ...task, check: !task.check })
                }
              />
              <ListItemText
                sx={{ textDecoration: task.check ? "line-through" : "unset" }}
              >
                {task.name}
              </ListItemText>
              <DeleteIcon
                className="delete-icon"
                onClick={() => deleteTask(task.id)}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default App;
