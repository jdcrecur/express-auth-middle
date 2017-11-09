# express-auth-middle
express-auth-middle

# What
An express middleware which can check for both an x-auth header or basic authentication.

Why? 
-  Lock an API behind private key with the std `X-Authorization: TOKEN privatekey` 
-  Lock an API or views behind HTTP basic authentication.

Don't pass your key to the client but allow the user to access the API with their basic auth creds.

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
      xAuthorisatioKey: config.xAuthorisationKey,
      basicAuthUname: config.basicAuthUname,
      basicAuthPword: config.basicAuthPword,
    },
    challenge: 'Protected area'
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
      xAuthorisatioKey: config.xAuthorisationKey,
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
    challenge: 'Protected area'
  }))

  app.use('/api/some', someRoutes())
}
```

# Future
Feel free to assist :)
