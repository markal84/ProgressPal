import { vi } from 'vitest'
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
  day: 'Saturday',
  date: '2023-05-06',
  exercises: mockExercises
}

test('renders workout and exercises component correctly', () => {
  const onDeleteWorkout = vi.fn()
  const onUpdateWorkout = vi.fn()

  render(
    <Workout
      workout={mockWorkout}
      onDeleteWorkout={onDeleteWorkout}
      onUpdateWorkout={onUpdateWorkout}
    />
  )

  expect(screen.getByText(/Day: Saturday/i)).toBeInTheDocument()
  expect(screen.getByText('Exercises:')).toBeInTheDocument()
})

test('clicking the button delete calls event handler once', async () => {
  const mockWorkout = {
    id: 1,
    day: 'Saturday',
    date: '2023-05-06',
    exercises: []
  }

  const mockHandler = vi.fn()
  const onUpdateWorkout = vi.fn()

  render(
    <Workout
      workout={mockWorkout}
      onDeleteWorkout={mockHandler}
      onUpdateWorkout={onUpdateWorkout}
    />
  )

  const user = userEvent.setup()
  const button = screen.getByText('Delete')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
