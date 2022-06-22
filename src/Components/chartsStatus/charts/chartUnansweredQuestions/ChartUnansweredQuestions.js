import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

//Styles
import Styles from './ChartUnansweredQuestions.module.css'

const ChartUnansweredQuestions = () => {

    const state = useSelector(state => state.saveReduserState)

    const data = {
        labels: ['سوال های بدون پاسخ', "سوال های صحیح", "سوال های غلط"],
        datasets: [
          {
            data: [
                state.saveUnansweredQuestions,
                state.saveCorrectQuestion,
                state.saveWronRuestion
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

    return (
      <div className={Styles.container}>
        <span>وضعیت پاسخ ها</span>
          <div className={Styles.chart}>
              <Doughnut data={data} options={options} /> 
          </div>
      </div>
    )
}

export default ChartUnansweredQuestions