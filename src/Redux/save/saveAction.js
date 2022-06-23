const getSaves = () => {
    return {
        type: 'GET_SAVES'
    }
}

const saveUnansweredQuestions = () => {
    return {
        type: "SAVE_UNANSWERED_QUESTION"
    }
}

const saveCorrectQuestion = () => {
    return {
        type: "SAVE_CORRECT_QUESTION",
    }
}

const saveWronRuestion = () => {
    return {
        type: "SAVE_WRON_QUESTION"
    }
}

const saveAddScore = payload => {
    return {
        type: "SAVE_ADD_SCORE",
        payload
    }
}

const saveSubtractScore = payload => {
    return {
        type: "SAVE_SUBTRACT_SCORE",
        payload
    }
}




export {getSaves, saveUnansweredQuestions, saveCorrectQuestion, saveWronRuestion, saveAddScore, saveSubtractScore}