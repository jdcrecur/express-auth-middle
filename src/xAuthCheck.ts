export default (req, xAuthorisationKey) => {
  if (req.headers['x-api-key'] ||
    req.headers['x-authorization'] ||
    req.headers.authorization
  ) {
    if (
      req.headers['x-api-key'] === xAuthorisationKey ||
      req.headers['x-authorization'] === 'Token ' + xAuthorisationKey ||
      req.headers.authorization === 'Token ' + xAuthorisationKey ||
      req.headers['x-authorization'] === 'TOKEN ' + xAuthorisationKey ||
      req.headers.authorization === 'TOKEN ' + xAuthorisationKey ||
      req.headers['x-authorization'] === 'Bearer ' + xAuthorisationKey ||
      req.headers.authorization === 'Bearer ' + xAuthorisationKey) {
      return true;
    }
  }
  return false;
};
