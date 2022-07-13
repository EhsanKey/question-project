import React, { useEffect, useState, } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
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
              '#ffc107',
              '#20c997',
              '#EB1616',
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
                color: '#fff'
            }
          }
        },
    }

    if (quiz) {
        return (
            <main className={Styles.container}>
                <Question 
                    setNumberQuiz={setNumberQuiz} 
                    numberQuiz={numberQuiz} quiz={quiz}
                    score={score}
                    setScore={setScore}
                    /> 
            </main>
        )
    }

    return ( 
        <main className={Styles.container}>
            { numberQuiz === settingquestionReducerState.length && 
                <div className={Styles.resultContainer}>
                    <section className={Styles.result}>
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
                    </section>
                        <section className={Styles.chart}>
                            <Doughnut data={data} options={options}/>
                        </section>
                        <button onClick={() => window.location.reload()} className={Styles.buuton}>شروع مجدد</button>
                </div>   
            }
        </main>
    )

}

export default Race; 