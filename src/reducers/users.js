import { RECEIVE_USERS } from "../actions/users";
import { ADD_ANSWER, ADD_QUESTION } from "../actions/common";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_QUESTION:
      let user = {
        ...state[action.question.author],
        questions: [
          ...state[action.question.author].questions,
          ...[action.question.id]
        ]
      }
      return {
        ...state,
        [action.question.author]: {
          ...user,
        }
      }
    case ADD_ANSWER:
      return {
        ...state,
        [action.user]: {
          ...state[action.user],
          answers: {
            ...state[action.user].answers,
            [action.qid]: action.answer
          }
        }
      }
    default:
      return state;
  }
}
