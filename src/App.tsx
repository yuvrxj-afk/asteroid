import React from "react";
import Form from "./components/Form";

const App: React.FC = () => {
  const handleRandomAsteroid = () => {
    // fetch details
    console.log("fetching details");
  };

  const handleFormSubmit = (id: string) => {
    console.log(id);
  };
  return (
    <div className="">
      
      {/* Form component */}
      <Form
        onRandomAsteroid={handleRandomAsteroid}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default App;
