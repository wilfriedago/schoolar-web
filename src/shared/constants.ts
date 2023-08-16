export const AppConstants = {
  pages: {
    public: {
      home: '/',
      about: '/about',
      contact: '/contact',
      unauthorized: '/403',
      notFound: '/404',
      serverError: '/500'
    },
    protected: {
      profile: '/profile',
      groups: '/profile/groups',
      events: '/profile/events',
      users: '/profile/users',
      subjects: '/profile/subjects',
      courses: '/profile/courses',
      classrooms: '/profile/classrooms',
      settings: '/settings',
      newUser: '/profile/new-user'
    },
    auth: {
      signin: '/auth/signin',
      signup: '/auth/signup',
      verifyEmail: '/auth/email/verify',
      validateEmail: '/auth/email/validate',
      resetPassword: '/auth/password/reset',
      forgotPassword: '/auth/password/forgot'
    }
  }
}

export const ApiConstants = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  routes: {
    auth: {
      signin: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`,
      signup: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
      verifyEmail: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/email/verify`,
      validateEmail: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/email/validate`,
      resetPassword: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/password/reset`,
      forgotPassword: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/password/forgot`
    }
  }
}

export const LibConstants = {}
