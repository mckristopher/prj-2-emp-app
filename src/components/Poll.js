import { connect } from "react-redux"
import '../css/poll-page.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleAnswerPoll } from "../actions/common";

const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return <Component {...props} router={{ location, navigate, params }} />;
    };
  
    return ComponentWithRouterProp;
  };

function Poll({ question, author, dispatch }) {

    const handleChoice = (answer) => {
        dispatch(handleAnswerPoll({
            id: question.id,
            answer
        }))
    }
    return (
        <div className="poll-container">
            <h2 className="heading"><em>{ author.name  }</em>  wants to know</h2>
            <img src={author.avatarURL} className="vote" alt="Avatar" />
            <h2 className="heading">Would You Rather?..</h2>
            <form className="poll-form">
                <input className="option-button" type="button" onClick={() => handleChoice('optionOne')} defaultValue={question.optionOne.text} />
                <p className="heading">OR</p>
                <input className="option-button" type="button" onClick={() => handleChoice('optionTwo')} defaultValue={question.optionTwo.text} />
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