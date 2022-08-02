import { connect } from "react-redux"

function Error(props) {
    return (
        <p>This is the Error</p>
    )
}

export default connect()(Error);