import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";

import Header from "./Header";
import { handleInitialData } from "../actions/common";

function App(props) {

  const { dispatch } = props;

  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);
  return (
    <Fragment>
    <div className="App">
      <Header />
      <Routes></Routes>
    </div>
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect()(App);
