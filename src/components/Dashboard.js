import { connect } from "react-redux";
import PollCard from "./PollCard";
import { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import authedUser from "../reducers/authedUser";

function Dashboard(props) {
    const [ filter, setFilter ] = useState('1');

    if (!props.authedUser) {
        return <Navigate replace to="/" />;
    }
    
    return (
        <div className="dashboard-container">
            <select className="filter" onChange={(e) => setFilter(e.target.value)}>
                <option value="1">Unanswered</option>
                <option value="2">Answered</option>
                <option value="">All</option>
            </select>
            <div className="dashboard">
            { filter !== '2' && (
                <div className="unanswered">
                    <h3>Unanswered</h3>
                    <hr />
                    <div className="poll-list">
                        { props.unanswered.map((q) => <PollCard key={q} id={q}/>) }
                    </div>
                </div>
            )}
            { filter !== '1' && (
                <div className="answered">
                    <h3>Answered</h3>
                    <hr />
                    <div className="poll-list">
                        { props.answered.map((q) => <PollCard key={q} id={q}/>) }
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}

const mapStateToProps = ({ questions, users, authedUser }) => {
    if (!authedUser) {
        return {
            authedUser
        }
    }
    let answered = Object.keys(users[authedUser]['answers']).sort(
        (a, b) => questions[b].timestamp - questions[a].timestamp
      );
    let unanswered = Object.keys(questions).filter((q) => !answered.includes(q)).sort(
        (a, b) => questions[b].timestamp - questions[a].timestamp
      );

    return {
        answered,
        unanswered,
        authedUser
    }
  }

export default connect(mapStateToProps)(Dashboard);