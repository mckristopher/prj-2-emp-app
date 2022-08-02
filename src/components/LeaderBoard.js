import { connect } from "react-redux"
import '../css/leaderboard.css';

function LeaderBoard(props) {
    return (
        <div className="container">
            <section id="leaderboard">
                <nav className="ladder-nav">
                    <div className="ladder-title">
                    <h1>Standings</h1>
                    </div>
                </nav>
                <table id="rankings" className="leaderboard-results" width="100%">
                    <thead>
                        <tr className="font-20">
                            <th>Rank</th>
                            <th>Users</th>
                            <th>Answered</th>
                            <th>Asked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.leaders.map((leader, i) => (
                                <tr className="font-20">
                                    <td>{ i + 1 }</td>
                                    <td>
                                        <div className="leader-info">
                                            <img src={ leader.avatar } className="leader-avatar"/>
                                            <div>
                                                <p><strong>{leader.name}</strong></p>
                                                <p><em>{leader.id}</em></p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{leader.asked}</td>
                                    <td>{leader.answered}</td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
            </section>
        </div>
    )
}

const mapStateToProps = ({ users }) => {
    let leaders = Object.keys(users).map((userId) => {
        let user = users[userId];
        return {
            id: user.id,
            name: user.name,
            avatar: user.avatarURL,
            asked: user.questions.length,
            answered: Object.keys(user.answers).length
        }
    }).sort((a, b) => (b.asked + b.answered) - (a.asked + a.answered));
    return {
        leaders
    };
}

export default connect(mapStateToProps)(LeaderBoard);