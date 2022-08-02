import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";

import Header from "./Header";
import { handleInitialData } from "../actions/common";
import Dashboard from "./Dashboard";
import CreatePoll from "./CreatePoll";
import Poll from "./Poll";
import LeaderBoard from "./LeaderBoard";
import Error from "./Error";
import questions from "../reducers/questions";

function App(props) {

  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);
  return (
    <Fragment>
    <div className="App">
      <Header />
      
      {props.loading === true ? null : (
        <Routes>
          <Route path="/" exact element={ <Dashboard />} />
          <Route path="/new" element={ <CreatePoll />} />
          <Route path="/poll/:id" element={ <Poll />} />
          <Route path="/leaderboard" element={ <LeaderBoard />} />
          <Route path="/error" element={ <Error />} />
        </Routes>)
      }
    </div>
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser, questions, users }) => ({
  loading: authedUser === null || !Object.keys(questions).length || !Object.keys(users).length,
});

export default connect(mapStateToProps)(App);
