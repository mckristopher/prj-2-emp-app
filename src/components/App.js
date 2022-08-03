import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";

import Header from "./Header";
import { handleInitialData } from "../actions/common";
import Login from "./Login";
import Dashboard from "./Dashboard";
import CreatePoll from "./CreatePoll";
import Poll from "./Poll";
import LeaderBoard from "./LeaderBoard";
import Error from "./Error";

function App(props) {

  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  // if (!props.authenticated) {
  //   return (<Fragment>
  //     <div className="App">
        
  //       <Routes>
  //           <Route path="/" exact element={ <Login /> } />
  //           <Route path='*' exact element={ <Error />} />
  //         </Routes>
  //     </div>
  //     </Fragment>)
  // }
  return (
    <Fragment>
    <div className="App">
      <Header />
      
      {props.loading === true ? null : (
        <Routes>
          {/* { props.authenticated ? 
            <Route path="/" exact element={ <Dashboard /> } /> : 
            <Route path="/" exact element={ <Login /> } />
          } */}
          <Route path="/" exact element={ <Login /> } />
          <Route path="/home" element={ <Dashboard /> } />
          <Route path="/new" element={ <CreatePoll />} />
          <Route path="/questions/:id" element={ <Poll />} />
          <Route path="/leaderboard" element={ <LeaderBoard />} />
          <Route path='*' exact element={ <Error />} />
        </Routes>)
      }
    </div>
    </Fragment>
  );
}

const mapStateToProps = ({ questions, users, authedUser }) => ({
  loading: !Object.keys(questions).length || !Object.keys(users).length,
  authenticated: !authedUser === null
});

export default connect(mapStateToProps)(App);
