import { useState } from 'react'
import Workout from './Workout'
import {
  Container,
  Grid,
  Box,
  Pagination,
  PaginationItem,
  Link
} from '@mui/material'
import { PropTypes } from 'prop-types'

export default function WorkoutList({
  workouts,
  onDeleteWorkout,
  onUpdateWorkout,
  setWorkouts,
  user
}) {
  const [currentPage, setCurrentPage] = useState(1)

  const workoutsPerPage = 6
  const totalPages = Math.ceil(workouts.length / workoutsPerPage)
  const startIndex = (currentPage - 1) * workoutsPerPage
  const endIndex = startIndex + workoutsPerPage
  const displayedWorkouts = workouts.slice(startIndex, endIndex)

  function handlePageChange(event, page) {
    setCurrentPage(page)
  }

  return (
    <Container maxWidth="lg">
      <Grid container rowSpacing={1} columnSpacing={{ md: 6 }}>
        {displayedWorkouts.map((workout) => (
          <Grid key={workout.id} item xs={12} md={6} mt={1} mb={1}>
            <Workout
              workout={workout}
              onDeleteWorkout={onDeleteWorkout}
              onUpdateWorkout={onUpdateWorkout}
              setWorkouts={setWorkouts}
              user={user}
            />
          </Grid>
        ))}
      </Grid>
      <Box
        display="flex"
        justifyContent="center"
        mt={2}
        mb={2}
        sx={{ width: '100%' }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/blogs?page=${item.page}`}
              {...item}
            />
          )}
        />
      </Box>
    </Container>
  )
}

WorkoutList.propTypes = {
  workouts: PropTypes.array.isRequired,
  onDeleteWorkout: PropTypes.func.isRequired,
  onUpdateWorkout: PropTypes.func.isRequired,
  setWorkouts: PropTypes.func.isRequired,
  user: PropTypes.object
}
