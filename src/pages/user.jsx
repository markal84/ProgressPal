import { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import userServices from '../services/users'
import PromptDialog from '../components/PromptDialog'
import Nav from '../components/Navigation'
import { useNavigate } from 'react-router-dom'
import { totalWeight } from '../utilis/workoutInfo'
import { Button, Container, Box, Typography } from '@mui/material'

export default function User({ user, setUser, setMessage, workouts }) {
  const navigate = useNavigate()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [exerciseArray, setExerciseArray] = useState([])
  const [totalExercises, setTotalExercises] = useState(0)

  useEffect(() => {
    const updatedExerciseArray = workouts.flatMap((workout) =>
      workout.exercises
        .filter((exercise) => !isNaN(Number(exercise.weight)))
        .map((exercise) => [
          Number(exercise.series),
          Number(exercise.repetitions),
          Number(exercise.weight)
        ])
    )

    setExerciseArray(updatedExerciseArray)
    setTotalExercises(workouts.flatMap((workout) => workout.exercises).length)
  }, [workouts])

  totalWeight(exerciseArray)

  function onRemove(user) {
    userServices.remove(user.id)
    window.localStorage.removeItem('loggedWorkoutAppUser')
    setUser(null)
    navigate('/')
  }

  function handleOpenDialog() {
    setDialogOpen(true)
  }

  function handleCloseDialog() {
    setDialogOpen(false)
  }

  if (user) {
    return (
      <>
        <Nav user={user} setMessage={setMessage} setUser={setUser} />
        <Container>
          <Box component="section">
            <h2>Your account</h2>
            <p>User Name: {user.name}</p>
            <Button
              variant="contained"
              color="error"
              onClick={handleOpenDialog}
              disabled={user.username === 'DemoUser'}
            >
              Remove User
            </Button>
            <PromptDialog
              open={dialogOpen}
              title="Delete User"
              message="Are you sure you want to delete your account?"
              onCancel={handleCloseDialog}
              onConfirm={() => {
                onRemove(user)
                handleCloseDialog()
              }}
            />
          </Box>
          <Box mt={4}>
            <Typography variant="h6" color="textSecondary" align="center">
              Total number of workouts
            </Typography>
            <Typography variant="h4" align="center">
              {workouts.length}
            </Typography>
            <Typography variant="h6" color="textSecondary" align="center">
              Total number of exercises
            </Typography>
            <Typography variant="h4" align="center">
              {totalExercises}
            </Typography>
            <Typography variant="h6" color="textSecondary" align="center">
              Total weight lifted
            </Typography>
            <Typography variant="h4" align="center">
              {totalWeight(exerciseArray)}kg
            </Typography>
          </Box>
        </Container>
      </>
    )
  }

  return null
}

User.propTypes = {
  workouts: PropTypes.array,
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}
