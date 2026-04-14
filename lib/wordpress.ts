export const WP_URL = process.env.NEXT_PUBLIC_WP_URL || 'http://43.110.61.240'

export interface WPUser {
  id: number
  username: string
  email: string
  name: string
  avatar_urls: {
    48: string
    96: string
  }
}

export interface WPLoginResponse {
  token: string
  user_email: string
  user_nicename: string
  user_display_name: string
}

export async function wpLogin(username: string, password: string): Promise<WPLoginResponse> {
  const response = await fetch(`${WP_URL}/wp-json/jwt-auth/v1/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Login failed')
  }

  return response.json()
}

export async function wpValidateToken(token: string): Promise<WPUser> {
  const response = await fetch(`${WP_URL}/wp-json/jwt-auth/v1/token/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Token validation failed')
  }

  const data = await response.json()
  return data.data
}

export async function wpRegister(email: string, username: string, password: string): Promise<WPUser> {
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Registration failed')
  }

  return response.json()
}

export async function wpGetUser(userId: number): Promise<WPUser> {
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to get user')
  }

  return response.json()
}

export function saveAuthToken(token: string, user: WPLoginResponse) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('wp_token', token)
    localStorage.setItem('wp_user', JSON.stringify(user))
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('wp_token')
  }
  return null
}

export function getAuthUser(): WPLoginResponse | null {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('wp_user')
    return user ? JSON.parse(user) : null
  }
  return null
}

export function clearAuth() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('wp_token')
    localStorage.removeItem('wp_user')
  }
}
