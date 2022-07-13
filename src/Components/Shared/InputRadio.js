import { SafetyCheckRounded } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'

import Styles from "./InputRadio.module.css"

const InputRadio = ({
    id, 
    value,
    name,
    changeHandler,
    statusChecked
}) => {
    
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (statusChecked === value) {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }, [statusChecked])

    const changed = e => {
        changeHandler(e.target.id)
        setChecked(true)
    }
    
    return (
        <div className={Styles.container}>
            <label className={checked ? Styles.checked : Styles} htmlFor={value}>{value}</label>
            <input onChange={e => changed(e)} className={checked ? Styles.checked : null} type="radio" id={value} name={name} />
        </div>
    )
}

export default InputRadio;