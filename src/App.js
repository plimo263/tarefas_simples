import { Container } from "@mui/material";
import React from "react";
import AreaDeTrabalho from "./components/Area-de-trabalho";
import { Provider } from "react-redux";

import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Container sx={{ pt: 1 }} maxWidth={false}>
        <AreaDeTrabalho />
      </Container>
    </Provider>
  );
}

export default App;
