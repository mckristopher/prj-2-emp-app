import { connect } from "react-redux";
import PollCard from "./PollCard";

function Dashboard(props) {
    return (
        <div className="dashboard">
            <div className="answered">
                <PollCard />
            </div>
            <div className="unanswered">
                <PollCard />
            </div>
        </div>
    )
}

export default connect()(Dashboard);