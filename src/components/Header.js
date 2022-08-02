import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = (props) => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leader Board</Link>
        </li>
        <li>
          <Link to="/new">New Poll</Link>
        </li>
      </ul>
    </nav>
  );
};

export default connect()(Header);
