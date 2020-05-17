# express-auth-middle
express-auth-middle

# What
An ExpressJS middleware that checks for both x-auth header or basic authentication written in TypeScript

Basic auth via the standard base64 encoded string.

A-Auth type will look for a match string: src/xAuthCheck.ts

# Example

Either basic auth or x-auth header
```
import authMiddleWare from 'express-auth-middle'
import someRoutes from './routes/api/someRoutes'
import config from '../config'

/**
 * Injects routes into the passed express app
 * @param app Express app
 */
export default (app) => {

  // Middleware for basicauth and xauth.
  app.use(authMiddleWare({
    methods: ['x-auth', 'basic-auth'], // This allows either
    credentials: {
      xAuthorisationKey: config.xAuthorisationKey,
      basicAuthUname: config.basicAuthUname,
      basicAuthPword: config.basicAuthPword,
    },
    challenge: 'Protected area' // Adding the challenge flag ensures the WWW-Authenticate header is returned to prompt the user for a username and password
  }))

  app.use('/api/some', someRoutes())
}
```

Just x-auth header
```
import authMiddleWare from 'express-auth-middle'
import someRoutes from './routes/api/someRoutes'
import config from '../config'

/**
 * Injects routes into the passed express app
 * @param app Express app
 */
export default (app) => {

  // Middleware for basicauth and xauth.
  app.use(authMiddleWare({
    methods: ['x-auth'], // This allows just x-auth
    credentials: {
      xAuthorisationKey: config.xAuthorisationKey,
    },
  }))

  app.use('/api/some', someRoutes())
}
```

Just basic auth
```
import authMiddleWare from 'express-auth-middle'
import someRoutes from './routes/api/someRoutes'
import config from '../config'

/**
 * Injects routes into the passed express app
 * @param app Express app
 */
export default (app) => {

  // Middleware for basicauth and xauth.
  app.use(authMiddleWare({
    methods: ['basic-auth'], // This allows just basic auth
    credentials: {
      basicAuthUname: config.basicAuthUname,
      basicAuthPword: config.basicAuthPword,
    },
    challenge: 'Protected area' // Adding the challenge flag ensures the WWW-Authenticate header is returned to prompt the user for a username and password
  }))

  app.use('/api/some', someRoutes())
}
```

# Future
Feel free to assist :)
