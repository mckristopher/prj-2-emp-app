import { connect } from "react-redux"

function Error() {
    return (
        <div className="error-container">
            <img src={ '/images/warning.png' } alt="error" width="200px"/>
            <h3>You do not have access to this page or the page does not exist</h3>
        </div>
    )
}

export default connect()(Error);