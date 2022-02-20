import "./App.scss";
import { useEffect, useState } from "react";
import { List, Container, Box } from "@mui/material";
import { Get } from "./providers";
import { NewTask,TaskItem } from "./components";


function App() {
  
  useEffect(() => {
    Get(taskOperation);
  }, []);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    check: false
  });


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
        <NewTask newTask={newTask} setNewTask={setNewTask} taskOperation={taskOperation} />
        <List>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} taskOperation={taskOperation} />      
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default App;
