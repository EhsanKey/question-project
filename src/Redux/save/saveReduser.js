const initiallState = {}


const saveReduser = (state = initiallState, action) => {
    switch(action.type) {
        case "SAVE_UNANSWERED_QUESTION" :
            var results = JSON.parse(localStorage.getItem("saveResults"));
                results = {
                    ...results,
                    saveUnansweredQuestions: results.saveUnansweredQuestions + 1
                }
            localStorage.setItem("saveResults", JSON.stringify(results))
            return {
                ...results
            }        
        case "SAVE_CORRECT_QUESTION" :
            var results = JSON.parse(localStorage.getItem("saveResults"));
                results = {
                    ...results,
                    saveCorrectQuestion: results.saveCorrectQuestion + 1,
                    score: results.score + action.payload,
                }
            localStorage.setItem("saveResults", JSON.stringify(results))
            return {
                ...results
            }        
        case "SAVE_WRON_QUESTION" :
            var results = JSON.parse(localStorage.getItem("saveResults"));
                results = {
                    ...results,
                    saveWronRuestion: results.saveWronRuestion + 1
                }
            localStorage.setItem("saveResults", JSON.stringify(results))
            return {
                ...results
            }
        default :
                return JSON.parse(localStorage.getItem("saveResults"))
    }
}

export default saveReduser;
