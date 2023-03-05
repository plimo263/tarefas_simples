import { Container } from "@mui/material";
import React from "react";
import AreaDeTrabalho from "./components/Area-de-trabalho";

function App() {
  return (
    <Container sx={{ pt: 1 }} maxWidth={false}>
      <AreaDeTrabalho />
    </Container>
  );
}

export default App;
