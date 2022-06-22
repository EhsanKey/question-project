const initiallState = [];

const mostAnswersReduser = (state = initiallState, action) => {
    switch(action.type) {
        case 'MOST_ANSWERS' :
            let results = JSON.parse(localStorage.getItem("mostAnswers"));
                let find = results.find(item => item.name === action.payload)
                if (find) {
                    find = {name: find.name, number: find.number + 1}
                    results = [
                        ...results.filter(item => item.name !== action.payload),
                        find
                    ]
                } else {
                    results = [
                        ...results,
                        {name: action.payload, number: 1}
                    ]
                }                
                localStorage.setItem("mostAnswers", JSON.stringify(results))
            return results
                default :
                    return JSON.parse(localStorage.getItem("mostAnswers"));
        }
}

export default mostAnswersReduser;