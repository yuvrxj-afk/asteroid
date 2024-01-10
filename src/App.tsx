import React from "react";
import Form from "./components/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Asteroid from "./components/Asteroid";
import Erroroid from "./components/Erroroid";

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/details/:asteroidId" Component={Asteroid}/>
          <Route path="/not-found" element={<Erroroid />} />
        </Routes>
    </Router>
  );
};

export default App;
