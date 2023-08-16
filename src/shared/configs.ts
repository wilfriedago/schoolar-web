export const AppConfig = {
  site_name: 'Starter',
  title: 'Nextjs Starter',
  description: 'Starter code for your Nextjs Boilerplate with Tailwind CSS',
  locale: 'en',
  baseUrl: process.env.NEXT_PUBLIC_APP_ENDPOINT as string
};

export const ApiConfig = {
  core: {
    baseUrl: process.env.NEXT_PUBLIC_API_CORE_ENDPOINT as string
  },
  logto: {
    baseUrl: process.env.NEXT_PUBLIC_API_LOGTO_ENDPOINT as string
  }
};

export const LibConfig = {};
