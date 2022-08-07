import { connect } from "react-redux"
import '../css/poll-page.css';
import { withRouter } from "../util/helper";
import { handleAnswerPoll } from "../actions/common";
import { PieChart } from 'react-minimal-pie-chart';
import { Navigate } from "react-router-dom";

function Poll({ question, author, answered, pie, answer, dispatch, invalidQ }) {

    const handleChoice = (answer) => {
        dispatch(handleAnswerPoll({
            id: question.id,
            answer
        }))
    }

    if (invalidQ) {
        return <Navigate to="/error" replace />
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
                    label={(data) => data.dataEntry.value ? data.dataEntry.value.toFixed(0) + '%' : ''} 
                    labelStyle={{
                        fontSize: '5px'
                    }}
                    labelPosition={55}
                    radius={35}
                />
                <div>
                    { pie.map((piece) => (
                    <p key={piece.color} className="p-legend">
                        <span className="legend" style = {{ 'backgroundColor': piece.color}}></span>
                        <span> - {piece.title} ( {piece.count} )</span>
                    </p>
                    ))}
                </div>
                </div>
                
            </div>
        )}
        </div>)
}

const mapStateToProps = ({ questions, users, authedUser }, props) => {
    if (!authedUser) {
        return {}
    }

    const { id } = props.router.params,
        question = questions[id];

    if (!question) {
        return {
            invalidQ: true
        }
    }
    const userCount = Object.keys(users).length,
        answered = Object.keys(users[authedUser].answers).includes(id),
        optionOnePercent = question.optionOne.votes.length/userCount,
        optionTwoPercent = question.optionTwo.votes.length/userCount;
    return {
        question,
        author: users[question.author],
        answered,
        answer: answered ? question[users[authedUser].answers[id]].text : null,
        pie: [
            { title: question.optionOne.text, value: optionOnePercent * 100, count: question.optionOne.votes.length, color: '#0A417A' },
            { title: question.optionTwo.text, value: optionTwoPercent * 100, count: question.optionTwo.votes.length, color: '#72B4EB' },
            { title: 'No Answer', value: (1 - (optionOnePercent + optionTwoPercent)) * 100, count: userCount - (question.optionOne.votes.length + question.optionTwo.votes.length), color: '#2085EC'}
        ]
    };
};

export default withRouter(connect(mapStateToProps)(Poll));