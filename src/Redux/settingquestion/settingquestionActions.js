const filterCategory = (questions, category) => {   
    return {
        payload: {questions, category},
        type: "CATEGORY"
    }
}

const filterDifficulty = (difficulty) => {   
    return {
        difficulty,
        type: "DIFFICULTY"
    }
}

const filterTypeQu = (typeQu) => {
    return {
        typeQu,
        type: "TYPE_QU"
    }
}

const removeFilter = (typeQu) => {
    return {
        type: "REMOVE_FILTER"
    }
}

export {filterCategory, filterDifficulty, filterTypeQu, removeFilter}