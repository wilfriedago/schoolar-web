import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { SignInForm } from './SignInForm'

test('Form submission with valid data', async () => {
  const onSubmitMock = jest.fn()
  render(<SignInForm onSubmit={onSubmitMock} />)

  // Fill in email and password inputs
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'valid_email@example.com' } })
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'validPassword' } })

  // Click the "Login" button
  fireEvent.click(screen.getByText(/login/i))

  // Ensure the onSubmit function is called with the correct form data
  await waitFor(() => {
    expect(onSubmitMock).toHaveBeenCalledWith({
      email: 'valid_email@example.com',
      password: 'validPassword',
      rememberMe: false
    })
  })
})

// Add more test scenarios here...
