import {
  ListItem,
  ListItemText,
  Checkbox
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {Put,Delete} from "../providers";


function TaskItem({task,taskOperation}) {
  
  return (
            <ListItem key={task.id} className="list-item">
              <Checkbox
                checked={task.check}
                onChange={() =>
                  Put(taskOperation, task.id, { ...task, check: !task.check })
                }
              />
              <ListItemText
                sx={{ textDecoration: task.check ? "line-through" : "unset" }}
              >
                {task.name}
              </ListItemText>
              <DeleteIcon
                className="delete-icon"
                onClick={() => Delete(taskOperation, task.id)}
              />
            </ListItem>
  );
}

export default TaskItem;
