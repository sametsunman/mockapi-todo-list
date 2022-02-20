import { Button, TextField } from "@mui/material";
import { Post } from "../providers";

function NewTask({ newTask, setNewTask, taskOperation }) {
  return (
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
          Post(taskOperation, newTask);
        }}
      >
        Add
      </Button>
    </div>
  );
}

export default NewTask;
