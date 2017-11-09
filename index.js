import basicAuth from 'basic-auth'

const return401 = (res, options) => {
  console.error('authorisationMiddleware 401')
  if (options.challenge) {
    res.set('WWW-Authenticate', 'Basic realm="' + options.challenge + '"')
  }
  return res.status(401).send()
}
const xAuthCheck = (req, xAuthorisationKey) => {
  if (req.headers['x-authorization']) {
    if (req.headers['x-authorization'] === 'TOKEN ' + xAuthorisationKey) {
      return true
    }
  }
  return false
}
const basicAuthCheck = (req, basicAuthUname, basicAuthPword) => {
  const user = basicAuth(req)
  if (!user) {
    console.error('Basic authentication failed')
    return false
  } else {
    return (basicAuthUname === user.name && basicAuthPword === user.pass)
  }
}

const validateSwitch = (type, req, credentials) => {
  switch (type) {
    case 'x-auth':
      if (credentials.xAuthorisationKey) {
        return xAuthCheck(req, credentials.xAuthorisationKey)
      } else {
        console.error('auth middleware use attempt with no xAuthorisationKey passed in the options! Returning false but this does not mean the auth check failed')
        return false
      }
    case 'basic-auth':
      if (credentials.basicAuthUname && credentials.basicAuthPword) {
        return basicAuthCheck(req, credentials.basicAuthUname, credentials.basicAuthPword)
      } else {
        console.error('auth middleware use attempt with no basicAuthUname OR basicAuthPword passed in the options! Returning false but this does not mean the auth check failed')
        return false
      }
    default:
      console.error('Invalid auth type passed, return false')
      return false
  }
}

/**
 * Express middleware to validate requests for basic and/or xAuth
 * @returns {Function}
 */
export default (options = {}) => {
  return (req, res, next) => {
    if (typeof options.methods === 'undefined' || typeof options.credentials === 'undefined') {
      console.error('No authentication methods defined in the provided options. Will return a default 401.')
      return return401(res, options)
    }
    if (typeof options.methods === 'string') {
      if (validateSwitch(options.methods, req)) {
        return next()
      }
      return return401(res, options)
    }

    if (Array.isArray(options.methods)) {
      for (let i = 0; i < options.methods.length; ++i) {
        if (validateSwitch(options.methods[i], req, options.credentials)) {
          return next()
        }
      }
    }
    // If we have reached this far, then 401
    return return401(res, options)
  }
}
