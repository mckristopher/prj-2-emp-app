import { getInitialData } from "../api";
import { setAuthedUser } from "./authedUser";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { createPoll, answerPoll } from "../api";

const AUTHED_ID = "tylermcginnis";

export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";

export function handleInitialData() {
  return (dispatch) => {
      return getInitialData().then(({ questions, users}) => {
        let session = localStorage.getItem('authenticated');
        dispatch(setAuthedUser(session !== 'null' ? session: null))
        dispatch(receiveQuestions(questions));
        dispatch(receiveUsers(users));
      })
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function addAnswer(answer) {
  return {
    type: ADD_ANSWER,
    ...answer
  }
}

export function handleCreatePoll(options) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return createPoll({
      optionOneText: options[0],
      optionTwoText: options[1],
      author: authedUser
    })
    .then((question) => dispatch(addQuestion(question)))
    .catch((error) => {
      console.warn("Error in handleCreatePoll: ", error);
      alert("There was an error creating the poll. Try again.");
    })
  }
}

export function handleAnswerPoll({ id, answer }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return answerPoll({
      authedUser,
      qid: id,
      answer
    })
    .then(() => dispatch(addAnswer({ qid: id, answer, user: authedUser })))
    .catch((error) => {
      console.warn("Error in handleAnswerPoll: ", error);
      alert("There was an error answering the poll. Try again.");
    })
  }
}