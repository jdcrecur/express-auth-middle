const basicAuth = require('basic-auth');
export default (req, basicAuthUname, basicAuthPword) => {
  const user = basicAuth(req);
  if (!user) {
    console.error('Basic authentication failed');
    return false;
  }
  else {
    return (basicAuthUname === user.name && basicAuthPword === user.pass);
  }
};
