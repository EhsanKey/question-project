import { combineReducers } from "redux";

import settingquestionReducer from "./settingquestion/settingquestionReducer";
import resultReduser from "./result/resultReduser";
import saveReduser from "./save/saveReduser";
import mostAnswersReduser from "./mostAnswers/mostAnswersReduser";

const rootReduser = combineReducers({
    settingquestionReducerState: settingquestionReducer,
    resultReduserState: resultReduser,
    saveReduserState: saveReduser,
    mostAnswersReduserState: mostAnswersReduser
});

export default rootReduser;