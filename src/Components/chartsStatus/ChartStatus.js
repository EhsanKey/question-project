import React from 'react'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

//Chart
import ChartCategoary from './charts/chartCategoary/ChartCategoary'
import ChartUnansweredQuestions from './charts/chartUnansweredQuestions/ChartUnansweredQuestions'

//Styles
import Styles from "./ChartStatus.module.css"

const ChartStatus = () => {

    const score = useSelector(state => state.saveReduserState.score)

    if (!score) {
        return (
            <div className={Styles.noneScore}>
                <span>لطفا برای نمایش نمودار اولین امتیاز خود را به دست بیاورید!</span>
                <Link to="/setting">بازگشت</Link>
            </div>
        )
    }
    
    return (
        <div className={Styles.container}>
            <ChartCategoary /> 
            <ChartUnansweredQuestions /> 
            <Link to="/setting">بازگشت</Link>
        </div>
    )
}

export default ChartStatus