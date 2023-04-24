import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const workouts = [
  {
    id: 1,
    day: 'Monday',
    date: 'selected date',
    exercises: [
      {
        id: 11,
        name: 'Lunges',
        weight: 44,
        series: 4,
        repetitions: 8
      },
      {
        id: 12,
        name: 'Barbell bench press',
        weight: 40,
        series: 4,
        repetitions: 5
      }
    ]
  },
  {
    id: 2,
    day: 'Wednesday',
    date: 'selected date2',
    exercises: [
      {
        id: 13,
        name: 'Bulgarian squat',
        weight: 44,
        series: 4,
        repetitions: 8
      },
      {
        id: 14,
        name: 'Dumbell press',
        weight: 44,
        series: 4,
        repetitions: 5
      }
    ]
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App workouts={workouts} />
  </React.StrictMode>
)
