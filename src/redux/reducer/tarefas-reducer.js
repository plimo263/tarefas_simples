import initialData from "../../data/data";
import {
  ADD_QUADRO,
  ADD_TAREFA,
  ATUALIZA_OBJETO,
  DEL_TAREFA,
  EDITAR_TAREFA,
} from "../actions/tarefas-actions";

function tarefasReducer(state = initialData, action) {
  switch (action.type) {
    case ATUALIZA_OBJETO:
      return action.data;
    case ADD_QUADRO:
      return {
        ...state,
        quadros: {
          ...state.quadros,
          [action.data.id]: {
            id: action.data.id,
            titulo: action.data.titulo,
            tarefas: [],
          },
        },
        ordemQuadros: [...state.ordemQuadros, action.data.id],
      };
    case ADD_TAREFA:
      return {
        ...state,
        quadros: {
          ...state.quadros,
          [action.data.idQuadro]: {
            ...state.quadros[action.data.idQuadro],
            tarefas: [
              ...state.quadros[action.data.idQuadro].tarefas,
              action.data.id,
            ],
          },
        },
        tarefas: {
          ...state.tarefas,
          [action.data.id]: {
            id: action.data.id,
            titulo: action.data.titulo,
          },
        },
      };
    case DEL_TAREFA:
      return (() => {
        const newTarefas = {};
        _.forEach(_.keys(state.tarefas), (k) => {
          if (k !== action.data) {
            newTarefas[k] = state.tarefas[k];
          }
        });

        // Atualiza os quadros
        const newQuadros = {};
        _.forEach(_.keys(state.quadros), (k) => {
          newQuadros[k] = {
            ...state.quadros[k],
            tarefas: state.quadros[k].tarefas.filter(
              (tarefa) => tarefa !== action.data
            ),
          };
        });

        return {
          ...state,
          tarefas: newTarefas,
          quadros: newQuadros,
        };
      })();
    case EDITAR_TAREFA:
      return {
        ...state,
        tarefas: {
          ...state.tarefas,
          [action.data.id]: action.data,
        },
      };
    default:
      return state;
  }
}

export default tarefasReducer;
