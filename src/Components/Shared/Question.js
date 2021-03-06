import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux"
import { memo } from 'react';

//Message
import { Message } from '../../Messages/Message';

//Dipatch 
import { correctQuestion, wronRuestion, unansweredQuestions } from '../../Redux/result/resultAction';
import { saveCorrectQuestion, saveUnansweredQuestions, saveWronRuestion, saveAddScore, saveSubtractScore } from '../../Redux/save/saveAction';
import { mostAnswers } from '../../Redux/mostAnswers/mostAnswersAction';

//Styles
import Styles from "./Question.module.css"

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
    background: white;
    color: black;
    cursor: pointer;
    color: ${props => props.status ? "white" : "black"};
    background-color: ${props => props.status && "red"};
    background-color: ${props => props.status && props.answerTrue === props.answer && "#20c997"};
    @media (max-width: 576px) {
        width: 140px;
        height: 80px;
    }
    @media (max-width: 400px) {
        width: 100px;
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
    justify-content: center;
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
        margin: 10px;
    }
    span {
        background: #fd7e14;
        width: 70px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 10px;
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

    const {category, correct_answer, incorrect_answers, question, typeQu} = quiz;
    const [answers, setAnswers] = useState([]);
    const [statusAnswers, setStatusAnswers] = useState(false);;
    const [message ,setMessage] = useState("");
    const [time, setTime] = useState(10);
    const [randomScore, setRandomScore] = useState()
    const [stopTime, setStopTime] = useState(false)
    const [error, setError] = useState(false)
    const [idTimeOut, setIdTimeOut] = useState('')
    
    useEffect(() => {
        //?????????? ???????? ????
        setAnswers([...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5))
        setStatusAnswers(false)
        setMessage('')
        setRandomScore( 1 + Math.floor(Math.random() * 4))
    }, [quiz])

    useEffect(() => {
        // ???? ???????? ??????????
        if (time >= 1 && !statusAnswers && !stopTime) {
            var idTimeOut = setTimeout(() => {
                setTime(time - 1)
            }, 1000);
            setIdTimeOut(idTimeOut)
        } else {
            // ?????????? ?????????? 
            if (time === 0) {
                setMessage(Message("endTime"))
                setStatusAnswers(true)
                dispatch(unansweredQuestions(quiz))
                dispatch(saveUnansweredQuestions())
            }
        }
    }, [time, numberQuiz, stopTime])
    
    const clickAnswers = e => {
        setStatusAnswers(true)
        if (e === correct_answer) {
            setMessage(Message(true))
            dispatch(correctQuestion(quiz))
            dispatch(saveCorrectQuestion())
            dispatch(saveAddScore(randomScore))
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
        clearTimeout(idTimeOut)
        setStopTime(false)
    }

    const stopTimeHandler = () => {
        if (score >= 30) {
            setStopTime(true)
            setTimeout(() => {
                setStopTime(false)
            }, 5000);
            dispatch(saveSubtractScore(30))
        }else {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 1000);
        }
    }

    const removeOptions = () => {
        if (score >= 40) {
            var item = incorrect_answers[Math.floor(Math.random()*incorrect_answers.length)];
            setAnswers([item, correct_answer].sort(() => Math.random() - 0.5))
            dispatch(saveSubtractScore(40))
        }else {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2000);
        }   
    }
    
    return (
        <section className={Styles.container}>
            <div className={Styles.quiz}>
                <article className={Styles.header}>
                    <div className={Styles.score}>
                        <span>{score > 0 ? score : "????????????"}</span>
                    </div>
                    {/* question */}
                    <div className={Styles.question}>{question}</div>
                    <span className={Styles.time + ' ' + (stopTime && Styles.stopTime) }>{time}</span>
                </article>
                        <article className={Styles.buttonContainer}>
                            {
                                answers.map(item =>
                                    <Button
                                        disabled={statusAnswers}
                                        key={item}
                                        status={statusAnswers} 
                                        answer={item} 
                                        answerTrue={correct_answer}
                                        onClick={e => clickAnswers(e.target.innerText)}>
                                    {item}</Button>)
                            }
                        </article>
                        {
                            error && <span className={Styles.error}>???????????? ?????? ???????? ?????? ????????</span>
                        }
                        <section className={Styles.help}>
                            <button disabled={message} onClick={() => {stopTimeHandler()}}>
                                <span>?????????? ???????? ?????????? </span>
                                <p> 30 ????????????</p>
                            </button>
                            <button disabled={typeQu === "???????? ??????"  ||message } onClick={() => {removeOptions()}}>
                                <span >?????? ???? ?????????? ?????? </span>
                                <p> 40 ???????????? </p>
                            </button>
                        </section>
                        <section className={Styles.info}>
                            <p><span>{category}</span>???????? ????????:</p>
                            <p><span>??????????</span>???????? ????????:</p>
                        </section>
                        <Banner active={message}>
                            <p>{message}</p>
                            <span onClick={() => nextQuestion()}>????????</span>
                        </Banner>
            </div>
        </section>
    )})

export default Question