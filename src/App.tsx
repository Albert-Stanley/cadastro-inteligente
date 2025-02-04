import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import DadosCadastrados from "./pages/DadosCadastrados";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dados" element={<DadosCadastrados />} />
      </Routes>
    </Router>
  );
};

export default App;
