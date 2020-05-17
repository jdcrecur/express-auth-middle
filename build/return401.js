"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (res, options) => {
    console.error('authorisationMiddleware 401');
    if (options.challenge) {
        res.set('WWW-Authenticate', 'Basic realm="' + options.challenge + '"');
    }
    return res.status(401).send();
};
//# sourceMappingURL=return401.js.map