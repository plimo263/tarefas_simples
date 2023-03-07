import initialData, { salvarDados } from "../../data/data";
import {
  ADD_QUADRO,
  ADD_TAREFA,
  ATUALIZA_OBJETO,
  DEL_TAREFA,
  EDITAR_TAREFA,
  EDITAR_QUADRO,
  DEL_QUADRO,
} from "../actions/tarefas-actions";

function tarefasReducer(state = initialData, action) {
  switch (action.type) {
    case ATUALIZA_OBJETO:
      return (() => {
        salvarDados(action.data);
        return action.data;
      })();
    case ADD_QUADRO:
      return (() => {
        const newData = {
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
        salvarDados(newData);
        return newData;
      })();
    case ADD_TAREFA:
      return (() => {
        const newData = {
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
        salvarDados(newData);
        return newData;
      })();

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

        const newData = {
          ...state,
          tarefas: newTarefas,
          quadros: newQuadros,
        };
        salvarDados(newData);
        return newData;
      })();
    case EDITAR_TAREFA:
      return (() => {
        const newData = {
          ...state,
          tarefas: {
            ...state.tarefas,
            [action.data.id]: action.data,
          },
        };
        salvarDados(newData);
        return newData;
      })();
    case EDITAR_QUADRO: // Edita o nome do quadro
      return (() => {
        const newData = {
          ...state,
          quadros: {
            ...state.quadros,
            [action.data.id]: {
              ...state.quadros[action.data.id],
              titulo: action.data.titulo,
            },
          },
        };
        salvarDados(newData);
        return newData;
      })();
    case DEL_QUADRO: // Deletando quadro
      return (() => {
        // Atualiza os quadros
        let tarefasDoQuadro;
        const newQuadros = {};
        _.forEach(_.keys(state.quadros), (k) => {
          if (k !== action.data) {
            newQuadros[k] = state.quadros[k];
          } else {
            // Todas as tarefas que precisam ser removidas
            tarefasDoQuadro = state.quadros[k].tarefas;
          }
        });
        const newTarefas = {};
        _.forEach(_.keys(state.tarefas), (k) => {
          if (!tarefasDoQuadro.includes(k)) {
            newTarefas[k] = state.tarefas[k];
          }
        });

        const newData = {
          ...state,
          tarefas: newTarefas,
          quadros: newQuadros,
          ordemQuadros: state.ordemQuadros.filter(
            (quadro) => quadro !== action.data
          ),
        };
        salvarDados(newData);
        return newData;
      })();
    default:
      return state;
  }
}

export default tarefasReducer;
