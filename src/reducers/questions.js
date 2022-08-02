import { RECEIVE_QUESTIONS } from "../actions/questions";
import { ADD_ANSWER, ADD_QUESTION } from "../actions/common";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: {
          ...action.question
        }
      }
    case ADD_ANSWER:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat(action.user)
          }
        }
      }
    default:
      return state;
  }
}
