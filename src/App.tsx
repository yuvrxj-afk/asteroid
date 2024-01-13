import React from "react";
import Form from "./components/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Asteroid from "./components/Asteroid";

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route
            path="/details/:asteroidId"
            element={<Asteroid asteroidData={window.location.href} loading={false} />}
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useLocation, useNavigate, useParams } from "react-router-dom";

// const withRouter = (Component: React.ComponentType<any>) => {
//   const WithRouter = (props: any) => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const params = useParams();
//     return <Component {...props} location={location} navigate={navigate} params={params} />;
//   }
//   return WithRouter;
// }


// export default withRouter