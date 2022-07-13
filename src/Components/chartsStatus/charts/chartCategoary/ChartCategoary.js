import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

//Styles
import Styles from "./ChartCategoary.module.css";

// مشخص کردن رنگ دسته بندی ها
const colors = [
  {categoary: "جغرافیا", color: "#9CF6FB"},
  {categoary: "ورزشی", color: "#FF6A3D"},
  {categoary: "مذهبی", color: "#F4DB7D"},
  {categoary: "اطلاعات عمومی", color: "#BCFD4C"},
  {categoary: "تکنولوژی", color: "#FAF1CF"},
  {categoary: "ریاضی و هوش", color: "#F1E821"},
  {categoary: "علم و دانش", color: "#61082B"},
]

const ChartCategoary = () => {
    
    ChartJS.register(ArcElement, Tooltip, Legend);
    
    const [numbers, setNumbers] = useState([])
    const [label, setLabal] = useState([])
    const [backgroundColor, setBackgroundColor] = useState([])
    const state = useSelector(state => state.mostAnswersReduserState)
    
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
    
    // ست کردن دیتا های نمودار
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

    // استایل نمودار
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
        }
    }

    return (
      <section className={Styles.container}>
        <span>بیشترین پاسخ درست بر اساس دسته بنده </span>
          <div className={Styles.chart}>
            <Doughnut data={data} options={options} /> 
          </div>
      </section>
    )
}

export default ChartCategoary;