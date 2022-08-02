import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";

function App() {
  return (
    <Fragment>
    <div className="App">
      <Header />
      <Routes></Routes>
    </div>
    </Fragment>
  );
}

export default App;
