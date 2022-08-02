import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/leader-board">Leader Board</Link>
        </li>
        <li>
          <Link to="/new">New Poll</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
