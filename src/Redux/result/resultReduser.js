const initiallState = {
    unansweredQuestions: 0,
    correctQuestion: 0,
    wronRuestion: 0,
}

const resultReduser = (state = initiallState, action) => {
    switch(action.type) {
        case "UNANSWERED_QUESTION" :
            return {
                ...state,
                unansweredQuestions: state.unansweredQuestions + 1
            }
        case "CORRECT_QUESTION" :
            return {
                ...state,
                correctQuestion: state.correctQuestion + 1
            }
        case "WRON_QUESTION" :
            return {
                ...state,
                wronRuestion: state.wronRuestion + 1
            }
        case "CLEAR_RESULT" :
            return {
                unansweredQuestions: 0,
                correctQuestion: 0,
                wronRuestion: 0,
            }
        default : 
            return state
    }
}

export default resultReduser;
