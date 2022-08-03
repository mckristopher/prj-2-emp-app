import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from '../actions/authedUser';
import { withRouter } from "../util/helper";

const Header = ({ user, dispatch, router }) => {
  return (
    
      <div className="header">
        { user ? (
        <>
          <nav className="nav">
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/leaderboard">Leader Board</Link>
              </li>
              <li>
                <Link to="/new">New Poll</Link>
              </li>
            </ul>
          </nav>
          <div className="user-info">
            <div className="profile">
              <img src={user.avatarURL} width="50px" />
              <span>{user.name}</span>
            </div>
            <Link to="/" onClick={() => {
                localStorage.setItem("authenticated", null)
                dispatch(setAuthedUser());
                router.navigate('/');
              }
            }>Log Out</Link>
          </div>
        </>
      ) : null }
    </div>
    
    
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
    user: users[authedUser]
})

export default withRouter(connect(mapStateToProps)(Header));
