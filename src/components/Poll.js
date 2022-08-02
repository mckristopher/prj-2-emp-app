import { connect } from "react-redux"
import '../css/poll-page.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return <Component {...props} router={{ location, navigate, params }} />;
    };
  
    return ComponentWithRouterProp;
  };

function Poll(props) {
    return (
        <div className="poll-container">
            <h2 className="heading"><em>{ props.author.name  }</em>  wants to know</h2>
            <img src={props.author.avatarURL} className="vote" alt="Avatar" />
            <h2 className="heading">Would You Rather?..</h2>
            <form className="poll-form">
                <button type="submit">{props.question.optionOne.text}</button>
                <p className="heading">OR</p>
                <button type="submit">{props.question.optionTwo.text}</button>
            </form>
        </div>
    )
}

const mapStateToProps = ({ questions, users }, props) => {
    const { id } = props.router.params;
    return {
        question: questions[id],
        author: users[questions[id].author]
    };
};

export default withRouter(connect(mapStateToProps)(Poll));