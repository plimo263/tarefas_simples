export const ADD_QUADRO = "ADD_QUADRO";
export const ADD_TAREFA = "ADD_TAREFA";
export const DEL_TAREFA = "DEL_TAREFA";
export const ATUALIZA_OBJETO = "ATUALIZA_OBJETO";
export const EDITAR_TAREFA = "EDITAR_TAREFA";

export const addQuadro = (quadro) => ({
  type: ADD_QUADRO,
  data: quadro,
});

export const addTarefa = (tarefa) => ({
  type: ADD_TAREFA,
  data: tarefa,
});

export const atualizaObjeto = (obj) => ({
  type: ATUALIZA_OBJETO,
  data: obj,
});

export const delTarefa = (tarefaID) => ({
  type: DEL_TAREFA,
  data: tarefaID,
});
//
export const editTarefa = (obj) => ({
  type: EDITAR_TAREFA,
  data: obj,
});
