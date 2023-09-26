// import { describe, expect, test } from "vitest"
import { render, screen } from '@testing-library/react'
import Login from '../pages/Login.tsx'

describe('Login component tests', () => {
  test('Login completely rendered', async () => {
    render(<Login />)
    const userNameInput = await screen.findByTestId('userName')
    expect(userNameInput).toBeDefined()
    const passwordInput = await screen.findByTestId('password')
    expect(passwordInput).toBeDefined()
    const submitButton = await screen.findByText('Log in')
    expect(submitButton).toBeDefined()
  })
})
