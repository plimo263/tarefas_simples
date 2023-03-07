import {
  IconButton,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import React, { useCallback, useState } from "react";
import { Stack } from "@mui/system";
import { useDispatch } from "react-redux";
import { delTarefa, editTarefa } from "../redux/actions/tarefas-actions";

function Tarefa({ tarefa, capturado }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  //
  const fecharMenu = useCallback(() => setAnchorEl(null), [setAnchorEl]);
  //
  const verMenu = useCallback(
    (e) => {
      setAnchorEl(e.currentTarget);
    },
    [setAnchorEl]
  );
  //
  const deletarTarefa = useCallback(() => {
    dispatch(delTarefa(tarefa.id));
    fecharMenu();
  }, [tarefa, fecharMenu, dispatch]);
  //
  const editarTarefa = useCallback(() => {
    const novoNome = window.prompt("Digite o nome da tarefa", tarefa.titulo);
    if (!novoNome) return null;
    dispatch(
      editTarefa({
        ...tarefa,
        titulo: novoNome,
      })
    );
    fecharMenu();
  }, [tarefa, fecharMenu, dispatch]);
  //
  const opcoes = [
    { nome: "Editar Tarefa", icone: <EditIcon />, onClick: editarTarefa },
    {
      nome: "Excluir Tarefa",
      icone: <DeleteIcon />,
      onClick: deletarTarefa,
    },
  ];

  return (
    <Paper
      sx={{
        mb: 1,
        transform: capturado && "scale(1.05) rotate(4deg)",
      }}
    >
      <ListItem
        secondaryAction={
          <IconButton onClick={verMenu}>
            <MenuIcon />
          </IconButton>
        }
      >
        <ListItemText primary={tarefa.titulo} />
      </ListItem>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={fecharMenu}>
        {opcoes.map((ele, idx) => (
          <MenuItem
            onClick={ele.onClick}
            key={idx}
            divider={idx < opcoes.length - 1}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              {ele.icone}
              <Typography variant="body1">{ele.nome}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  );
}

export default Tarefa;
