import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'; 
import MenuItem from '@mui/material/MenuItem';

//Data
import { questions } from '../../Questions/questions'

//Dispatch
import { filterCategory, filterDifficulty, filterTypeQu } from '../../Redux/settingquestion/settingquestionActions'
import { Link, useNavigate } from 'react-router-dom';
import { getSaves } from '../../Redux/save/saveAction';

//Icons
import {BiLineChart} from "react-icons/bi"
import Styles from "./Setting.module.css"
import { clearResult } from '../../Redux/result/resultAction';

const Setting = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const state = useSelector(state => state)

    const {saveReduserState , settingquestionReducerState} = state
    
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("")
    const [typeQu, setTypeQu] = useState("")
    const [noneFilter, setNoneFilter] = useState(false)

    useEffect(() => {
        dispatch(getSaves())
        dispatch(clearResult())
    }, [])

    useEffect(() => {
        if(settingquestionReducerState.length) {
            navigate("/race")
        }
    } ,[noneFilter])

    const submitHandler = e => {
        e.preventDefault()
        dispatch(filterCategory(questions, category))
        dispatch(filterDifficulty(difficulty))
        dispatch(filterTypeQu(typeQu))
        if(!settingquestionReducerState.length) {
            setNoneFilter(true)
        }
    }

    return (
        <div className={Styles.container}>
            <FormGroup >
            <div className={Styles.title}>
                <span>{saveReduserState && saveReduserState.score}</span>
                <p>قیلتر خود را بر روی سوالات اعمال کنید</p>
                <Link to="/chartStatus"><BiLineChart /></Link >
            </div>
                <FormControl
                    margin="normal">
                    <InputLabel id="category" >دسته بندی</InputLabel>
                    <Select
                     onChange={e => setCategory(e.target.value)}
                     labelId="category" 
                     label="دسته بندی"
                     >
                        <MenuItem value="همه">همه</MenuItem>
                        {
                            questions.map(item => <MenuItem value={item.category} key={item.category}>{item.category}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <FormControl
                     margin="normal">
                    <InputLabel id="difficulty">درجه ی سختی</InputLabel>
                    <Select onChange={e => setDifficulty(e.target.value)}
                     labelId="difficulty"
                     label="درجه ی سختی"
                     >
                        <MenuItem value="همه">همه</MenuItem>
                        <MenuItem value="آسان">آسان</MenuItem>
                        <MenuItem value="متوسط">متوسط</MenuItem>
                        <MenuItem value="سخت">سخت</MenuItem>
                    </Select>
                </FormControl>
                <FormControl
                    margin="normal">
                    <InputLabel id='typeQu'>نوع سوال ها</InputLabel>
                    <Select onChange={e => setTypeQu(e.target.value)}
                    labelId="typeQu"
                    label="نوع سوال ها"
                    >
                        <MenuItem value="همه">همه</MenuItem>
                        <MenuItem value="چهارگزینه ای">چهارگزینه ای</MenuItem>
                        <MenuItem value="صحیح غلط">صحیح غلط</MenuItem>
                    </Select>
                </FormControl>
                {
                    noneFilter && <h4>سوالی با این فیلتر پیدا نشد</h4>
                }
                <Button onClick={e => submitHandler(e)} variant="contained">شروع</Button>
            </FormGroup>
        </div>
    )
}

export default Setting