import { connect } from "react-redux";
import '../css/login.css';
import { setAuthedUser } from '../actions/authedUser';
import { Navigate } from "react-router-dom";

const users = [
    { name: 'John Doe', id: 'johndoe' },
    { name: 'Sarah Edo', id: 'sarahedo' },
    { name: 'Tyler Mcginnis', id: 'tylermcginnis' }
]

function Login({ authedUser, dispatch }) {
    if (authedUser) {
        return <Navigate replace to="/home" />;
    }

    return (
        <div className="login-container">
            <img src={ 'images/vote.png' } className="vote" alt="Avatar" />
            <p>Login As:</p>
            <select className="user" onChange={(e) => {

                    localStorage.setItem("authenticated", e.target.value)
                    dispatch(setAuthedUser(e.target.value))
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