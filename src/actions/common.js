import { setAuthedUser } from "./authedUser";

const AUTHED_ID = "tylermcginnis";

export function handleInitialData() {
  return (dispatch) => {
      dispatch(setAuthedUser(AUTHED_ID));
  };
}
