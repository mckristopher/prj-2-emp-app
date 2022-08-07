import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { setAuthedUser } from "../actions/authedUser";
import '../css/login.css';

import useAuth from '../util/useAuth';

const users = [
    { name: 'John Doe', id: 'johndoe' },
    { name: 'Sarah Edo', id: 'sarahedo' },
    { name: 'Tyler Mcginnis', id: 'tylermcginnis' }
]

function Login({ authedUser, dispatch }) {

    const navigate = useNavigate();
    const { login } = useAuth();
    const { state } = useLocation();

    return (
        <div className="login-container">
            <img src={ 'images/vote.png' } className="vote" alt="Avatar" />
            <p>Login As:</p>
            <select className="user" onChange={async (e) => {
                    dispatch(setAuthedUser(e.target.value));
                    await login();
                    navigate( state?.path || '/home');
                }
            }>
                <option>Select User..</option>
                {
                    users.map((user) => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))
                }
            </select>
        </div>
    )
}

const mapStateToProps = ({ authedUser }) => ({
    authedUser
})

export default connect(mapStateToProps)(Login);