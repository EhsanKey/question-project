const mostAnswers = category => {
    return {
        payload: category,
        type: "MOST_ANSWERS"
    }
}

export {mostAnswers}