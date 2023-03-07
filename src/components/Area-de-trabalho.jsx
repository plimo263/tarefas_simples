import React, { useCallback, useContext, useState } from "react";
import { v4 } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import _ from "lodash";
import Quadro from "./Quadro";
import { Button, Paper, Stack, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addQuadro,
  addTarefa,
  atualizaObjeto,
} from "../redux/actions/tarefas-actions";
//
const selectDados = (state) => state.data;

function AreaDeTrabalho() {
  const dispatch = useDispatch();
  const data = useSelector(selectDados);

  //
  const onDragEnd = useCallback(
    (result) => {
      const { source, destination } = result;
      //
      if (!destination) return;
      //
      if (
        source.index === destination.index &&
        source.droppableId === destination.droppableId
      ) {
        return null;
      }
      let newState;

      // É para o mesmo quadro
      if (source.droppableId === destination.droppableId) {
        // Alguma coisa mudou, vamos alterar as ordens
        const tarefasOrigem = Array.from(
          data.quadros[source.droppableId].tarefas
        );
        const [tarefa] = tarefasOrigem.splice(source.index, 1);
        tarefasOrigem.splice(destination.index, 0, tarefa);

        newState = {
          ...data,
          quadros: {
            ...data.quadros,
            [source.droppableId]: {
              id: source.droppableId,
              titulo: data.quadros[source.droppableId].titulo,
              tarefas: tarefasOrigem,
            },
          },
        };
      } else {
        // É de um quadro para o outro
        const tarefasOrigem = Array.from(
          data.quadros[source.droppableId].tarefas
        );
        const [tarefa] = tarefasOrigem.splice(source.index, 1);
        //
        const tarefasDestino = Array.from(
          data.quadros[destination.droppableId].tarefas
        );
        tarefasDestino.splice(destination.index, 0, tarefa);

        newState = {
          ...data,
          quadros: {
            ...data.quadros,
            [source.droppableId]: {
              id: source.droppableId,
              titulo: data.quadros[source.droppableId].titulo,
              tarefas: tarefasOrigem,
            },
            [destination.droppableId]: {
              id: destination.droppableId,
              titulo: data.quadros[destination.droppableId].titulo,
              tarefas: tarefasDestino,
            },
          },
        };
      }
      dispatch(atualizaObjeto(newState));
    },
    [data, dispatch]
  );
  //
  //
  const onCriarQuadro = useCallback(() => {
    const novoQuadro = window.prompt("Digite o nome do novo quadro");
    if (!novoQuadro) return false;
    //
    const UUID = v4();
    dispatch(
      addQuadro({
        id: UUID,
        titulo: novoQuadro,
      })
    );
    //
  }, [dispatch]);
  //
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack
        direction="row"
        spacing={3}
        sx={{ overfloX: "auto", width: "100%" }}
      >
        {_.map(data.ordemQuadros, (quadro) => {
          console.log(quadro);
          const tarefasQuadro = data.quadros[quadro].tarefas;
          const { titulo } = data.quadros[quadro];

          const tarefas = _.map(tarefasQuadro, (k) => data.tarefas[k]);

          return (
            <Quadro
              id={quadro}
              key={quadro}
              tarefas={tarefas}
              titulo={titulo}
            />
          );
        })}
        <Paper elevation={0} sx={{ width: 360 }}>
          <Button
            title="Crie um novo quadro"
            onClick={onCriarQuadro}
            fullWidth
            variant="outlined"
            sx={{ whiteSpace: "nowrap" }}
          >
            + Criar novo quadro
          </Button>
        </Paper>
      </Stack>
    </DragDropContext>
  );
}

export default AreaDeTrabalho;
