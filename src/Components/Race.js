import React, { useEffect, useState, } from 'react'
import { useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

//Components
import Question from "./Shared/Question"

//Styles
import Styles from "./Race.module.css"

const Race = () => {

    const navigate = useNavigate();
    ChartJS.register(ArcElement, Tooltip, Legend);

    const state = useSelector(state => state);
    const {settingquestionReducerState, resultReduserState} = state;

    const [numberQuiz, setNumberQuiz] = useState(0);
    const [quiz, setQuiz] = useState();
    const [score, setScore] = useState(0)

    useEffect(() => {
        if (!settingquestionReducerState.length) navigate("/setting")
        setQuiz(settingquestionReducerState[numberQuiz])
    }, [])

    useEffect(() => {
        setQuiz(settingquestionReducerState[numberQuiz])
        
    }, [numberQuiz])
    
    const data = {
        labels: ['سوال های بدون پاسخ', 'سوال های درست', 'سوال های نادرست'],
        datasets: [
          {
            data: [
                resultReduserState.unansweredQuestions,
                resultReduserState.correctQuestion,
                resultReduserState.wronRuestion
            ],
            backgroundColor: [
              'orange',
              'green',
              'red',
            ],
            borderWidth: 1,
          },
        ],
      };

      const options = {
        plugins: {
          legend: {
            position: 'right',
            rtl : true,
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20,
            }
          }
        },
    }

    if (quiz) {
        return (
            <div className={Styles.container}>
                <Question 
                    setNumberQuiz={setNumberQuiz} 
                    numberQuiz={numberQuiz} quiz={quiz}
                    score={score}
                    setScore={setScore}
                    /> 
            </div>
        )
    }

    return ( 
        <div className={Styles.container}>
            {
                numberQuiz === settingquestionReducerState.length && 
                <div className={Styles.resultContainer}>
                <div className={Styles.result}>
                <span>نتیجه ی بازی</span>
                    <div>
                        <p>سوال های صحیح:</p>
                        <span>{resultReduserState.correctQuestion}</span>
                    </div>
                    <div>
                        <p>سوال های اشتباه:</p>
                        <span>{resultReduserState.wronRuestion}</span>
                    </div>
                    <div>
                        <p>سوال های بدون پاسخ:</p>
                        <span>{resultReduserState.unansweredQuestions}</span>
                    </div>
                    <div>
                        <p>تعداد کل سوال ها:</p>
                        <span>{settingquestionReducerState.length}</span>
                    </div>
                </div>
                <div className={Styles.chart}>
                    <Doughnut data={data} options={options}/>
                </div>
                    <Link className={Styles.buuton} to="/setting">شروع مجدد</Link>
            </div>   
            }
        </div>
    )

}

export default Race;