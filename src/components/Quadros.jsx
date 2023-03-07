import React from "react";
import { useSelector } from "react-redux";
import Quadro from "./Quadro";

const selectDados = (state) => state.data;

function Quadros() {
  const data = useSelector(selectDados);
  return (
    <>
      {_.map(data.ordemQuadros, (quadro) => {
        const tarefasQuadro = data.quadros[quadro].tarefas;
        const { titulo } = data.quadros[quadro];
        const tarefas = _.map(tarefasQuadro, (k) => data.tarefas[k]);
        return (
          <Quadro id={quadro} key={quadro} tarefas={tarefas} titulo={titulo} />
        );
      })}
    </>
  );
}

export default Quadros;
