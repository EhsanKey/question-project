import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux"
import { memo } from 'react';

//Message
import { Message } from '../../Messages/Message';

//Dipatch 
import { correctQuestion, wronRuestion, unansweredQuestions } from '../../Redux/result/resultAction';
import { saveCorrectQuestion, saveUnansweredQuestions, saveWronRuestion } from '../../Redux/save/saveAction';

//Styles
import Styles from "./Question.module.css"
import { mostAnswers } from '../../Redux/mostAnswers/mostAnswersAction';


const Button = styled.button`
    margin: 0 auto;
    width: 180px;
    height: 80px;
    border-radius: 5px;
    border: none;
    font-size: 17PX;
    text-align: center;
    transition: all .5s ease;
    font-weight: bold;
    background: #dde1e7;
    cursor: pointer;
    color: ${props => props.status ? "white" : "black"};
    box-shadow: inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(94,104,121,0.3);
    background-color: ${props => props.status && "red"};
    background-color: ${props => props.status && props.answerTrue === props.answer && "#00ff00"};
    @media (max-width: 400px) {
        width: 110px;
        height: 60px;
        font-size: 13px;
    }
`

const Banner = styled.div`
    position: absolute;
    top: 30%;
    width: 400px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white ;
    -webkit-box-shadow: 1px 3px 26px -6px #333333;
    box-shadow: 1px 3px 26px -6px #333333;
    border-radius: 10px;
    opacity: ${props => props.active ? "1" : "0"};
    transform: ${props => props.active ? "scale(1)" : "scale(0)"};
    transition: all .3s ease-in-out;
    p {
        width: 70%;
        text-align: center;
        font-weight: bold;
        font-size: 17px;
    }
    span {
        background: blue;
        width: 70px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;    
    }
    @media (max-width: 576px) {
        width: 80%;
        p {
            font-size: 15px;    
        }
    }
`

const Question = memo(({ setNumberQuiz, numberQuiz, quiz}) => {

    const dispatch = useDispatch()
    const score = useSelector(state => state.saveReduserState.score)

    const {category, correct_answer, incorrect_answers, question} = quiz;
    const [answers, setAnswers] = useState([]);
    const [statusAnswers, setStatusAnswers] = useState(false);;
    const [message ,setMessage] = useState("");
    const [time, setTime] = useState(10);
    const [randomScore, setRandomScore] = useState()
    
    useEffect(() => {
        setAnswers([...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5))
        setStatusAnswers(false)
        setMessage('');
        setRandomScore( 1 + Math.floor(Math.random() * 4))
    }, [quiz])
    
    useEffect(() => {
        if (time >= 1 && !statusAnswers) {
            setTimeout(() => {
                setTime(time - 1)
            }, 1000);
        } else {
            if (time === 0) {
                setMessage("ریدی")
                setStatusAnswers(true)
                dispatch(unansweredQuestions(quiz))
                dispatch(saveUnansweredQuestions())
            }
        }
    }, [time, numberQuiz])
    
    const clickAnswers = e => {
        setStatusAnswers(true)
        if (e === correct_answer) {
            setMessage(Message(true))
            dispatch(correctQuestion(quiz))
            dispatch(saveCorrectQuestion(randomScore))
            dispatch(mostAnswers(category))
        } else {
            setMessage(Message(false))
            dispatch(wronRuestion(quiz))
            dispatch(saveWronRuestion())
        }
    }

    const nextQuestion = () => {
        setNumberQuiz(numberQuiz + 1)
        setStatusAnswers(false)
        setTime(10)
    }
    
    return (
        <div className={Styles.container}>
            <div className={Styles.quiz}>
            <div className={Styles.score}>
                <span>{score > 0 ? score : "امتیاز"}</span>
            </div>
            <div className={Styles.question}>{question}</div>
            <span className={Styles.time}>{time}</span>
                    <div className={Styles.buttonContainer}>
                        {
                            answers.map(item => <Button disabled={statusAnswers} key={item}
                            status={statusAnswers} answer={item} answerTrue={correct_answer}
                             onClick={e => clickAnswers(e.target.innerText)}>
                            {item}</Button>)
                        }
                    </div>
                <div className={Styles.info}>
                    <p><span>{category}</span>دسته بندی:</p>
                    <p><span>سیستم</span>طراح سوال:</p>
                </div>
                    <Banner active={message}>
                        <p>{message}</p>
                        <span onClick={() => nextQuestion()}>بعدی</span>
                    </Banner>
        </div>
        </div>
        )
    })

export default Question