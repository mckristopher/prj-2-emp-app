import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from '../actions/authedUser';
import { withRouter } from "../util/helper";
import useAuth from '../util/useAuth';

const Header = ({ user, dispatch, router }) => {
  const { logout } = useAuth();

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
                <Link to="/add">New Poll</Link>
              </li>
            </ul>
          </nav>
          <div className="user-info">
            <div className="profile">
              <img src={user.avatarURL} width="50px" />
              <span>{user.name}</span>
            </div>
            <Link to="/" onClick={async () => {
                dispatch(setAuthedUser());
                await logout();
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
