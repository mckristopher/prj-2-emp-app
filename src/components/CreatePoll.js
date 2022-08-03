import { connect } from "react-redux";
import { useState } from "react";
import { handleCreatePoll } from '../actions/common';
import { withRouter } from "../util/helper";
import '../css/create-poll.css';

function CreatePoll({ dispatch, router }) {
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(handleCreatePoll([ optionOne, optionTwo ]));

        setOptionOne('');
        setOptionTwo('');

        router.navigate('/home');
    }

    return (
        <div className="create-container">
            <img src="/images/vote.png" className="vote" alt="vote" />
            <h2 className="heading">Would You Rather?..</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Option One" type="text" onChange={(e) => setOptionOne(e.target.value)} />
                <input placeholder="Option Two" type="text" onChange={(e) => setOptionTwo(e.target.value)} />
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    )
}

export default withRouter(connect()(CreatePoll));