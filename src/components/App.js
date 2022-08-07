import { Fragment } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import Header from "./Header";
import { handleInitialData } from "../actions/common";
import Login from "./Login";
import Dashboard from "./Dashboard";
import CreatePoll from "./CreatePoll";
import Poll from "./Poll";
import LeaderBoard from "./LeaderBoard";
import Error from "./Error";
import useAuth, { AuthProvider } from '../util/useAuth';

function App(props) {

  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  function RequireAuth({ children }) {
    const { authed } = useAuth();
    const location = useLocation();
  
    return authed === true ? children : <Navigate to="/" replace state={{ path: location.pathname }} />;
  }

  return (
    <Fragment>
    <div className="App">
      
      {props.loading === true ? null : (
        <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" exact element={ <Login /> } />
          <Route path="/home" element={ 
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
           } />
          <Route path="/add" element={ 
            <RequireAuth>
              <CreatePoll />
            </RequireAuth>
           } />
          <Route path="/questions/:id" element={ 
            <RequireAuth>
              <Poll />
            </RequireAuth>
           } />
          <Route path="/leaderboard" element={ 
            <RequireAuth>
              <LeaderBoard />
            </RequireAuth>
           } />
          <Route path='*' exact element={ <Error />} />
        </Routes>
        </AuthProvider>)
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
