import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
