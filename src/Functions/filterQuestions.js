export const filterQuestions = (questions, category) => {
    return questions.filter(item => item.category.trim() === category.trim()) 
}