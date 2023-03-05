import { ListItem, ListItemText, Paper } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";

function Tarefa({ tarefa, capturado }) {
  return (
    <Paper
      sx={{
        mb: 1,
        transform: capturado && "scale(1.05)",
      }}
    >
      <ListItem>
        <ListItemText primary={tarefa.titulo} />
      </ListItem>
    </Paper>
  );
}

export default Tarefa;
