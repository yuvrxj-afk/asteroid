import React from "react";
import Form from "./components/Form";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Asteroid from "./components/Asteroid";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/details" element={<Asteroid />} />
        </Routes>
      </Router>
    );
  }
}

export default App;

