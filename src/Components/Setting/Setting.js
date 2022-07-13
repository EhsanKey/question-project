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
import { filterCategory, filterDifficulty, filterTypeQu, removeFilter } from '../../Redux/settingquestion/settingquestionActions'
import { clearResult } from '../../Redux/result/resultAction';
import { Link, useNavigate } from 'react-router-dom';
import { getSaves } from '../../Redux/save/saveAction';

//Icons
import { BiLineChart } from "react-icons/bi"
import Styles from "./Setting.module.css"
import InputRadio from '../Shared/InputRadio';

const Setting = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const state = useSelector(state => state)

    const {saveReduserState , settingquestionReducerState} = state
    
    const [category, setCategory] = useState("همه دسته بندی ها");
    const [difficulty, setDifficulty] = useState("همه")
    const [typeQu, setTypeQu] = useState("هر دو")
    const [noneFilter, setNoneFilter] = useState(false)

    useEffect(() => {
        dispatch(removeFilter())
        dispatch(clearResult())
        dispatch(getSaves())
    }, [])

    useEffect(() => {
        if(settingquestionReducerState.length) {
            navigate("/race")
        }
    } ,[settingquestionReducerState])

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
        <main className={Styles.container}>
            <form onSubmit={e => submitHandler(e)}>

                <section className={Styles.title}>
                    <span>{saveReduserState && saveReduserState.score}</span>
                    <p>فیلتر خود را بر روی سوالات اعمال کنید</p>
                    <Link to="/chartStatus"><BiLineChart /></Link >
                </section>

                <section className={Styles.filters}>

                    <div className={Styles.filterContainer}>
                    <label>دسته بندی</label>
                        <div>
                        <InputRadio 
                            value="همه دسته بندی ها" 
                            name="category"
                            changeHandler={setCategory}
                            statusChecked={category} />
                                {
                                    questions.map(item =>
                                            <InputRadio 
                                            value={item.category} 
                                            name="category" 
                                            changeHandler={setCategory}
                                            statusChecked={category} />    
                                    )
                                }
                        </div>
                    </div>

                    <div className={Styles.filterContainer} >
                    <label>سطح</label>
                        <div>
                            <InputRadio 
                                value="همه" 
                                name="difficulty"
                                changeHandler={setDifficulty}
                                statusChecked={difficulty} />
                            <InputRadio 
                                value="آسان" 
                                name="difficulty" 
                                changeHandler={setDifficulty}
                                statusChecked={difficulty}  />
                            <InputRadio 
                                value="متوسط" 
                                name="difficulty" 
                                changeHandler={setDifficulty}
                                statusChecked={difficulty}  />
                            <InputRadio 
                                value="سخت" 
                                name="difficulty" 
                                changeHandler={setDifficulty}
                                statusChecked={difficulty}  />
                        </div>
                    </div>

                    <div className={Styles.filterContainer}>
                        <label>تایپ سوال ها</label>
                        <div>
                            <InputRadio 
                                value="هر دو" 
                                name="typeQu"
                                changeHandler={setTypeQu}
                                statusChecked={typeQu} />
                            <InputRadio 
                                    value="صحیح غلط" 
                                    name="typeQu" 
                                    changeHandler={setTypeQu}
                                    statusChecked={typeQu}  />
                            <InputRadio
                                    value="چهارگزینه ای"
                                    name="typeQu" 
                                    changeHandler={setTypeQu} 
                                    statusChecked={typeQu} />
                        </div>

                    </div>
                </section>
                {noneFilter && <h4>سوالی با این فیلتر پیدا نشد</h4>}

                <div className={Styles.submit}>
                    <input type="submit" value="شروع" />
                </div>
            </form>
        </main>
    )
}

export default Setting