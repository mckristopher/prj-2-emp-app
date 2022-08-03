import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Fragment } from "react";
import { setAuthedUser } from '../actions/authedUser';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, dispatch}) => {
  const authedUser = !!localStorage.getItem("authenticated");
  return (
    
      <div className="header">
        { authedUser && user ? (
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
                localStorage.setItem('authenticated', null);
                dispatch(setAuthedUser())
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

export default connect(mapStateToProps)(Header);
