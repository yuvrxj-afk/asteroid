import React from "react";
import Form from "./components/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Asteroid from "./components/Asteroid";

interface AppProps {
  navigate: () => void;
}

interface AppState {
  navigator: number;
  redirect: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      navigator: 0,
      redirect: false,
    };
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.setState({ redirect: true });
    }, this.state.navigator);
  }

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
