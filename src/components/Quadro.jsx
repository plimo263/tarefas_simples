import {
  Box,
  Button,
  Divider,
  Grow,
  List,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import React, { useCallback } from "react";
import { v4 } from "uuid";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { addTarefa } from "../redux/actions/tarefas-actions";
import Tarefa from "./Tarefa";

function Quadro({ titulo, tarefas, id }) {
  const dispatch = useDispatch();
  // Funcao para adicionar nova tarefa
  const onAddTarefa = useCallback(() => {
    const novaTarefa = window.prompt("DIGITE O NOME DA TAREFA");
    if (!novaTarefa) {
      return null;
    }
    // Gera o UUID da tarefa
    const UUID = v4();
    dispatch(
      addTarefa({
        id: UUID,
        idQuadro: id,
        titulo: novaTarefa,
      })
    );
  }, [dispatch, id]);

  //
  return (
    <Paper
      sx={{
        p: 1,
        background: (theme) => theme.palette.mode !== "dark" && grey[200],
      }}
    >
      <Stack sx={{ width: 360 }}>
        <Stack direction="row" justifyContent="space-between">
          <div />
          <Typography textAlign="center" variant="h6">
            {titulo}
          </Typography>
          <Button title="Clique para incluir nova tarefa" onClick={onAddTarefa}>
            + ADD
          </Button>
        </Stack>
        <Divider />
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <List
                sx={{
                  background: snapshot.isDraggingOver && blue[200],
                  transition: "all .2s",
                  p: 1,
                  minHeight: 540,
                  overflowY: "auto",
                }}
              >
                {tarefas?.map((ele, idx) => (
                  <Draggable key={ele.id} draggableId={ele.id} index={idx}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Tarefa tarefa={ele} capturado={snapshot.isDragging} />
                      </div>
                    )}
                  </Draggable>
                ))}
              </List>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Stack>
    </Paper>
  );
}

export default Quadro;
