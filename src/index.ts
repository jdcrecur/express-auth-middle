import { Options } from './interfaces/Options';
import validateSwitch from './validateSwitch';
import return401 from './return401';

/**
 * Express middleware to validate requests for basic and/or xAuth
 * @returns {Function}
 */
export default (options: Options) => {
  return (req, res, next) => {
    if (typeof options.methods === 'undefined' || typeof options.credentials === 'undefined') {
      console.error('No authentication methods defined in the provided options. Will return a default 401.');
      return return401(res, options);
    }
    if (typeof options.methods === 'string') {
      if (validateSwitch(options.methods, req, options.credentials)) {
        return next();
      }
      return return401(res, options);
    }

    if (Array.isArray(options.methods)) {
      for (let i = 0; i < options.methods.length; ++i) {
        if (validateSwitch(options.methods[i], req, options.credentials)) {
          return next();
        }
      }
    }
    // If we have reached this far, then 401
    return return401(res, options);
  };
};
