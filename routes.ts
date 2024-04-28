/**
 * An array of routes that are accessiable to the public
 * these routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    '/'
]

/**
 * An array of routes that are accessiable to authentication
 * these routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    '/auth/login',
    '/auth/register'
]

/**
 * The prefix for API authen tication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string[]}
 */

export const apiAuthPrefix = '/api/auth'

export const DEFAULT_LOGIN_REDIRECT = '/settings'
