const unansweredQuestions = question => {
    return {
        payload: question,
        type: "UNANSWERED_QUESTION"
    }
}


const correctQuestion = question => {
    return {
        payload: question,
        type: "CORRECT_QUESTION"
    }
}

const wronRuestion = question => {
    return {
        payload: question,
        type: "WRON_QUESTION"
    }
}

const clearResult = () => {
    return {
        type: "CLEAR_RESULT"
    }
}

export {correctQuestion, wronRuestion, unansweredQuestions, clearResult}