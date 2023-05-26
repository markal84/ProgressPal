import { vi, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Workout from '../components/Workout'
import userEvent from '@testing-library/user-event'

const mockExercises = [
  {
    id: 2,
    name: 'Test exercise',
    repetitions: 2,
    series: 3,
    weight: 44
  },
  {
    id: 3,
    name: 'Test exercise2',
    repetitions: 22,
    series: 33,
    weight: 444
  }
]

const mockWorkout = {
  id: 1,
  day: 'Wednesday',
  date: '2023-05-17',
  exercises: mockExercises
}

it('renders workout and exercises component correctly', () => {
  const onDeleteWorkout = vi.fn()
  const onUpdateWorkout = vi.fn()

  render(
    <Workout
      workout={mockWorkout}
      onDeleteWorkout={onDeleteWorkout}
      onUpdateWorkout={onUpdateWorkout}
    />
  )

  expect(screen.getByText(/Wednesday/i)).toBeInTheDocument()
})

test('click delete button calls event handler once', async () => {
  const mockWorkout = {
    id: 1,
    day: 'Saturday',
    date: '2023-05-06',
    exercises: []
  }

  const mockHandler = vi.fn()
  const onUpdateWorkout = vi.fn()
  const setWorkouts = vi.fn()

  render(
    <Workout
      workout={mockWorkout}
      onDeleteWorkout={mockHandler}
      onUpdateWorkout={onUpdateWorkout}
      setWorkouts={setWorkouts}
    />
  )

  const user = userEvent.setup()
  const button = screen.getByLabelText('delete workout')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
