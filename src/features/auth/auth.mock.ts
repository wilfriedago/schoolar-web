import { rest } from 'msw'

import { ApiConstants } from '@/shared/constants'

import type { SignInFormData } from './forms/SignInForm'

const { routes } = ApiConstants

export const authHandlers = [
  rest.post(routes.auth.signin, async (req, res, ctx) => {
    console.log(req)
    const { email, password } = await req.json<SignInFormData>()

    if (email === 'alreadyTaken@example.com') {
      return res(
        ctx.status(422),
        ctx.json({
          errors: {
            email: ['The email has already been taken.']
          }
        })
      )
    }

    if (email === 'newUser@example.com' && password === 'password') {
      return res(
        ctx.status(200),
        ctx.json({
          user: {
            id: 1,
            email: 'newUser@example.com',
            emailVerifiedAt: null
          }
        })
      )
    }

    return res(
      ctx.status(401),
      ctx.json({
        errors: {
          client: ['The provided credentials are incorrect.']
        }
      })
    )
  })
]
