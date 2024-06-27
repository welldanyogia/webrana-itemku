/**
 * An array of routes that are accessible to the public
 * These routes do not required authentication
 * @type {string[]}
 * */
export const publicRoutes = [
    "/"
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect to Dashboard Page
 * @type {string[]}
 * */
export const authRoutes = [
    "/signin",
    "/signup"
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API Authentication
 * @type {string}
 * */
export const apiAuthPrefix = "/api/auth"

/**
 * Default redirect path after login
 * @type {string}
 * */

export const DEFAULT_LOGIN_REDIRECT = "/dashboard"