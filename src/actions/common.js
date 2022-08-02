import { getInitialData } from "../api";
import { setAuthedUser } from "./authedUser";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { createPoll } from "../api";

const AUTHED_ID = "tylermcginnis";

export const ADD_QUESTION = "ADD_QUESTION";

export function handleInitialData() {
  return (dispatch) => {
      return getInitialData().then(({ questions, users}) => {
        dispatch(setAuthedUser(AUTHED_ID));
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
      console.warn("Error in handleToggleTweet: ", error);
      alert("There was an error creating the poll. Try again.");
    })
  }
}