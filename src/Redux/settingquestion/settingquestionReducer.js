const initiallState = [];

const settingquestionReducer = (state = initiallState, action) => {
    switch(action.type) {
        case "CATEGORY" :
            if (action.payload.category === "همه"  || action.payload.category === '') {
                var questions = []
                for(let i = 0; i < Object.keys(action.payload.questions).length; i++) {
                    questions = [...questions ,...action.payload.questions[i].questions]
                }
                return questions.sort(() => Math.random() - 0.5)
            }
            
            const category = action.payload.questions.filter(item => item.category === action.payload.category);
            return category[0].questions.sort(() => Math.random() - 0.5);
        case "DIFFICULTY" :
            if (action.difficulty === "همه"  ||action.difficulty === '') {
                return state
            }
            return state.filter(item => item.difficulty === action.difficulty);
        case "TYPE_QU" : 
        if (action.typeQu === "همه"  ||action.typeQu === '') {
            return state
        }
        return state.filter(item => item.typeQu === action.typeQu);
        case "REMOVE_FILTER" : 
            return []
        default :
            return state           
    }
}

export default settingquestionReducer;