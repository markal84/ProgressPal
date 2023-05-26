import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App Component Test', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />)
    expect(container).toBeInTheDocument()
  })

  it('renders learn react link', () => {
    render(<App />)
    const title = screen.getByText(/Gym progress/i)
    expect(title).toBeInTheDocument()
  })
})
