import React,{useEffect} from 'react'
import { Provider } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import store from './Redux/store'

//Components
import Setting from './Components/Setting/Setting'
import Race from "./Components/Race"
import ChartStatus from './Components/chartsStatus/ChartStatus'

//Styles
import "./App.css"

const App = () => {

    useEffect(() => {
        if (!localStorage.getItem("saveResults")) {
            localStorage.setItem("saveResults", JSON.stringify({
                saveUnansweredQuestions: 0,
                saveCorrectQuestion: 0,
                saveWronRuestion: 0,
                score: 0
            }))
        }
        
        if (!localStorage.getItem("mostAnswers")) {
            localStorage.setItem("mostAnswers", JSON.stringify([]))
        }
    }, [])


    return (
        <Provider store={store}>
            <Routes>
                <Route path='/chartStatus' element={<ChartStatus /> } /> 
                <Route path='/race' element={<Race /> } /> 
                <Route path='/setting' element={<Setting /> } />
                <Route path='/' element={<Navigate to="/setting " />} /> 
            </Routes>
        </Provider>
    )
}

export default App