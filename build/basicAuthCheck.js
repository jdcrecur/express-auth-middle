"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basicAuth = require('basic-auth');
exports.default = (req, basicAuthUname, basicAuthPword) => {
    const user = basicAuth(req);
    if (!user) {
        console.error('Basic authentication failed');
        return false;
    }
    else {
        return (basicAuthUname === user.name && basicAuthPword === user.pass);
    }
};
//# sourceMappingURL=basicAuthCheck.js.map