import { combineReducers, legacy_createStore as createStore } from "redux";
import tarefasReducer from "./reducer/tarefas-reducer";

export default createStore(
  combineReducers({
    data: tarefasReducer,
  })
);
