import {
  Box,
  Button,
  Divider,
  Grow,
  IconButton,
  List,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import React, { useCallback, useRef } from "react";
import { v4 } from "uuid";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import isHotkey from "is-hotkey";
import { useClickAway, useToggle } from "react-use";
import {
  addTarefa,
  delQuadro,
  editQuadro,
} from "../redux/actions/tarefas-actions";
import Tarefa from "./Tarefa";
import DeleteIcon from "@mui/icons-material/Delete";

// Teclas de atalho para execução de recursos com combinação.
const HOTKEY_VALIDADOR = {
  enter: (evt) => isHotkey("enter")(evt),
  //ctrlI: (evt) => isHotkey("mod+i")(evt),
};

function Quadro({ titulo, tarefas, id }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [editar, setEditar] = useToggle(null);
  // Se caso clicar fora do campo
  useClickAway(ref, () => {
    setEditar();
  });
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
  const onEditarNome = useCallback(
    (e) => {
      if (HOTKEY_VALIDADOR.enter(e)) {
        // Atualiza o nome (se o mesmo tiver algo)
        if (e.target.value.length > 0) {
          dispatch(
            editQuadro({
              id: id,
              titulo: e.target.value,
            })
          );
          setEditar();
        }
      }
    },
    [setEditar, dispatch]
  );
  //
  const onExcluirQuadro = useCallback(() => {
    if (window.confirm("Deseja realmente excluir o quadro ?")) {
      dispatch(delQuadro(id));
    }
  }, [id, dispatch]);

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
          {!editar && (
            <IconButton
              title="Excluir o quadro"
              color="error"
              onClick={onExcluirQuadro}
            >
              <DeleteIcon />
            </IconButton>
          )}
          {editar ? (
            <TextField
              ref={ref}
              autoFocus
              inputProps={{ style: { textAlign: "center" } }}
              type="text"
              fullWidth
              size="small"
              variant="standard"
              defaultValue={titulo}
              label="Digite o nome"
              onKeyDown={onEditarNome}
            />
          ) : (
            <Typography
              sx={{ cursor: "pointer", flex: 1 }}
              onClick={setEditar}
              textAlign="center"
              variant="h6"
            >
              {titulo}
            </Typography>
          )}
          {!editar && (
            <Button
              title="Clique para incluir nova tarefa"
              onClick={onAddTarefa}
            >
              + ADD
            </Button>
          )}
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
