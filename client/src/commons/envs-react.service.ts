class EnvsService {
  environment: string = import.meta.env.VITE_APP_ENV || ''
  baseURL: string = import.meta.env.VITE_BASE_URL || ''
  apiUrl: string = import.meta.env.VITE_API_URL || ''
}

export const envsService = new EnvsService()
