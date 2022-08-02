import { connect } from "react-redux";
import PollCard from "./PollCard";

function Dashboard(props) {
    return (
        <div className="dashboard">
            <div className="unanswered">
                <h3>Unanswered</h3>
                <hr />
                <div className="poll-list">
                    { props.unanswered.map((q) => <PollCard key={q} id={q}/>) }
                </div>
            </div>
            <div className="answered">
                <h3>Answered</h3>
                <hr />
                <div className="poll-list">
                    { props.answered.map((q) => <PollCard key={q} id={q}/>) }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ questions, users, authedUser }) => {
    let answered = Object.keys(users[authedUser]['answers']).sort(
        (a, b) => questions[b].timestamp - questions[a].timestamp
      );
    let unanswered = Object.keys(questions).filter((q) => !answered.includes(q)).sort(
        (a, b) => questions[b].timestamp - questions[a].timestamp
      );

    return {
        answered,
        unanswered
    }
  }

export default connect(mapStateToProps)(Dashboard);