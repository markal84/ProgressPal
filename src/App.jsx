import Workout from './components/Workout'

function App(props) {
  const { workouts } = props

  return (
    <>
      <div>
        <h1>Gym progress app</h1>
        <div>
          {workouts.map((workout) => (
            <Workout key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
