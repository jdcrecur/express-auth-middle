import basicAuthCheck from './basicAuthCheck';
import xAuthCheck from './xAuthCheck';
import { ValidateSwitchType } from './enums/ValidateSwitchType';
import { Credentials } from './interfaces/Credentials';

export default (type: ValidateSwitchType, req, credentials: Credentials) => {
  switch (type) {
    case 'x-auth':
      if (credentials.xAuthorisationKey) {
        return xAuthCheck(req, credentials.xAuthorisationKey);
      } else {
        console.error('auth middleware use attempt with no xAuthorisationKey passed in the options! Returning false but this does not mean the auth check failed');
        return false;
      }
    case 'basic-auth':
      if (credentials.basicAuthUname && credentials.basicAuthPword) {
        return basicAuthCheck(req, credentials.basicAuthUname, credentials.basicAuthPword);
      }
      if (credentials.basicAuthArray) {
        let pass = false;
        credentials.basicAuthArray.forEach((basicAuth) => {
          if (basicAuthCheck(req, basicAuth.basicAuthUname, basicAuth.basicAuthPword)) {
            pass = true;
          }
        });
        return pass;
      }
      console.error('auth middleware use attempt with no basicAuthUname OR basicAuthPword passed in the options! Returning false but this does not mean the auth check failed');
      return false;
    default:
      console.error('Invalid auth type passed, return false');
      return false;
  }
};
