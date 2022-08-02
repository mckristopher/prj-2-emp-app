import { connect } from "react-redux"
import '../css/poll-page.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleAnswerPoll } from "../actions/common";
import { PieChart } from 'react-minimal-pie-chart';


const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return <Component {...props} router={{ location, navigate, params }} />;
    };
  
    return ComponentWithRouterProp;
  };

function Poll({ question, author, answered, pie, answer, dispatch }) {

    const handleChoice = (answer) => {
        dispatch(handleAnswerPoll({
            id: question.id,
            answer
        }))
    }
    return (
        <div>
            { !answered ? (
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
        ) : (
            <div className="poll-container result">=
                <div className="poll-results">
                    <h1 className="heading">Poll Result</h1>
                    <h2 className="heading"> Poll By : <em>{ author.name  }</em></h2>
                    <img src={author.avatarURL} className="vote" alt="Avatar" />
                    <h2 className="heading"> Your Answer : <em>{ answer  }</em></h2>
                </div>
                
                <div className="poll-pie">
                <PieChart 
                    data={pie} 
                    label={(data) => data.dataEntry.title + ' - ' + data.dataEntry.count + ': '+ data.dataEntry.value.toFixed(2) + '%'} 
                    radius={35} labelPosition={100}
                    reveal={true}
                    labelStyle={{
                        fontSize: "5px",
                        fontColor: "000000",
                    }}

                />
                </div>
                
            </div>
        )}
        </div>)
}

const mapStateToProps = ({ questions, users, authedUser }, props) => {
    const { id } = props.router.params,
        question = questions[id],
        userCount = Object.keys(users).length,
        optionOnePercent = question.optionOne.votes.length/userCount,
        optionTwoPercent = question.optionTwo.votes.length/userCount;
    return {
        question,
        author: users[question.author],
        answered: Object.keys(users[authedUser].answers).includes(id),
        answer: question[users[authedUser].answers[id]].text,
        pie: [
            { title: question.optionOne.text, value: optionOnePercent, count: question.optionOne.votes.length, color: '#2085EC' },
            { title: question.optionTwo.text, value: optionTwoPercent, count: question.optionTwo.votes.length, color: '#72B4EB' },
            { title: 'No Answer', value: 1 - (optionOnePercent + optionTwoPercent), count: userCount - (question.optionOne.votes.length + question.optionTwo.votes.length), color: '#0A417A' }
        ]
    };
};

export default withRouter(connect(mapStateToProps)(Poll));