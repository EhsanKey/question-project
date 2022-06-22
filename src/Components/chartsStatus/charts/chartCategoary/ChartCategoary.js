import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

//Styles
import Styles from "./ChartCategoary.module.css";

const colors = [
  {categoary: "مذهبی", color: "red"},
  {categoary: "جغرافیا", color: "blue"},
  {categoary: "اطلاعات عمومی", color: "yellow"},
  {categoary: "ورزشی", color: "burlywood"},
  {categoary: "طبیعت", color: "aqua"},
]

const ChartCategoary = () => {
    
    ChartJS.register(ArcElement, Tooltip, Legend);

    const state = useSelector(state => state.mostAnswersReduserState)
    const [numbers, setNumbers] = useState([])
    const [label, setLabal] = useState([])
    const [backgroundColor, setBackgroundColor] = useState([])

      const data = {
      labels: label,
      datasets: [
        {
          data: numbers,
          backgroundColor: backgroundColor,
          borderWidth: 1,
        },
      ],
    };
    
    const setData = () => {
      let numbers = []
      let categoary = []
      let background = []
      for (let i = 0; i < state.length; i++) {
        numbers = [...numbers, state[i].number]
        categoary = [...categoary, state[i].name]
      }
      for (let i = 0; i < state.length; i++) {
        const color = colors.find(color => color.categoary === state[i].name);
        background = [...background, color.color]
      }
      setNumbers(numbers)
      setLabal(categoary)
      setBackgroundColor(background)
    }

    useEffect(() => {
      setData()
    }, [])

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

    return (
      <div className={Styles.container}>
        <span>بیشترین پاسخ درست بر اساس دسته بنده </span>
          <div className={Styles.chart}>
            <Doughnut data={data} options={options} /> 
          </div>
      </div>
    )
}

export default ChartCategoary;