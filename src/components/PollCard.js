import { connect } from "react-redux";
import icons from '../icons';

function PollCard(props) {
    return (
        <div className="card">
            <img src={icons['johndoe']} alt="Avatar" />
            <div className="container">
                <h4><b>John Doe</b></h4> 
                <p>Architect & Engineer</p> 
            </div>
        </div>
    )
}

export default connect()(PollCard);