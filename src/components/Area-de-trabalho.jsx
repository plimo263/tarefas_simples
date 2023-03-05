import React, { useCallback, useState } from "react";
import { v4 } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import _ from "lodash";
import initialData from "../data/data";
import Quadro from "./Quadro";
import { Button, Paper, Stack, TextField } from "@mui/material";

function AreaDeTrabalho() {
  const [data, setData] = useState(initialData);

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

      setData(newState);
    },
    [data, setData]
  );
  // Funcao para adicionar nova tarefa
  const onAddTarefa = useCallback(
    (idQuadro) => {
      const novaTarefa = window.prompt("DIGITE O NOME DA TAREFA");
      if (!novaTarefa) {
        return null;
      }
      // Gera o UUID da tarefa
      const UUID = v4();
      setData({
        ...data,
        quadros: {
          ...data.quadros,
          [idQuadro]: {
            ...data.quadros[idQuadro],
            tarefas: [...data.quadros[idQuadro].tarefas, UUID],
          },
        },
        tarefas: {
          ...data.tarefas,
          [UUID]: {
            id: UUID,
            titulo: novaTarefa,
          },
        },
      });
    },
    [data, setData]
  );
  //
  const onCriarQuadro = useCallback(() => {
    const novoQuadro = window.prompt("Digite o nome do novo quadro");
    if (!novoQuadro) return false;
    //
    const UUID = v4();

    setData({
      ...data,
      quadros: {
        ...data.quadros,
        [UUID]: {
          id: UUID,
          titulo: novoQuadro,
          tarefas: [],
        },
      },
      ordemQuadros: [...data.ordemQuadros, UUID],
    });
  }, [data, setData]);

  //
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack
        direction="row"
        spacing={3}
        sx={{ overfloX: "auto", width: "100%" }}
      >
        {_.map(data.ordemQuadros, (quadro) => {
          const tarefasQuadro = data.quadros[quadro].tarefas;
          const { titulo } = data.quadros[quadro];

          const tarefas = _.map(tarefasQuadro, (k) => data.tarefas[k]);

          return (
            <Quadro
              id={quadro}
              key={quadro}
              tarefas={tarefas}
              titulo={titulo}
              onAddTarefa={() => onAddTarefa(quadro)}
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
