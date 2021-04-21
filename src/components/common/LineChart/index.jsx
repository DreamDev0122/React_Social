import React from 'react'
import { Line } from '@reactchartjs/react-chart.js'

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [1, 5, 2, 1, 2, 0],
      fill: true,
      backgroundColor: '#66CCCC', // rgb(255, 99, 132)
      borderColor: '#66CCCC', // rgba(255, 99, 132, 0.2)
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const LineChart = () => (
  <>
    <div className='header'>
      <h1 className='title'>Line Chart</h1>
    </div>
    <Line
      data={data}
      options={options}
      height={80}
    />
  </>
);

export default LineChart;
