import { connect } from "react-redux";
import { Link } from 'react-router-dom';

export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }

function PollCard(props) {
    return (
        <Link className="card" to={ '/questions/' + props.id }>
            <img src={props.image} alt="Avatar" />
            <div className="container">
                <h4><b>{props.author}</b></h4> 
                <p>{props.time}</p> 
            </div>
        </Link>
    )
}

const mapStateToProps = ({ questions ,users }, props) => {
    let info = questions[props.id];

    return {
        id: props.id,
        author: users[info.author].name,
        image: users[info.author].avatarURL,
        time: formatDate(info.timestamp)
    }
}

export default connect(mapStateToProps)(PollCard);