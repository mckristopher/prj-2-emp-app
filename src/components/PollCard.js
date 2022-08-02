import { connect } from "react-redux";

export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }

function PollCard(props) {
    return (
        <div className="card" onClick="">
            <img src={props.image} alt="Avatar" />
            <div className="container">
                <h4><b>{props.author}</b></h4> 
                <p>{props.time}</p> 
            </div>
        </div>
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