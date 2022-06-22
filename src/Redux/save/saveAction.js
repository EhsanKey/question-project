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


const saveCorrectQuestion = score => {
    return {
        type: "SAVE_CORRECT_QUESTION",
        payload: score
    }
}

const saveWronRuestion = () => {
    return {
        type: "SAVE_WRON_QUESTION"
    }
}



export {getSaves, saveUnansweredQuestions, saveCorrectQuestion, saveWronRuestion}