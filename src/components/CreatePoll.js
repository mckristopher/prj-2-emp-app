import { connect } from "react-redux";
import { useState } from "react";
import { handleCreatePoll } from '../actions/common';
import { withRouter } from "../util/helper";
import '../css/create-poll.css';

function CreatePoll({ dispatch, router, authedUser }) {
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(handleCreatePoll([ optionOne, optionTwo ]));

        setOptionOne('');
        setOptionTwo('');

        router.navigate('/home');
    }

    if (authedUser === null) {
        window.location = '/';
        return;
    }

    return (
        <div className="create-container">
            <img src="/images/vote.png" className="vote" alt="vote" />
            <h2 className="heading">Would You Rather?..</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Option One" type="text" data-testid='optionOne' onChange={(e) => setOptionOne(e.target.value)} />
                <input placeholder="Option Two" type="text" data-testid='optionTwo' onChange={(e) => setOptionTwo(e.target.value)} />
                <button type="submit" data-testid='submitQuestion' disabled={ !optionOne || !optionTwo }>SUBMIT</button>
            </form>
        </div>
    )
}

const mapStateToProps = ({ authedUser}) => ({
    authedUser
})

export default withRouter(connect(mapStateToProps)(CreatePoll));