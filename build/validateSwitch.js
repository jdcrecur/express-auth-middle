"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basicAuthCheck_1 = __importDefault(require("./basicAuthCheck"));
const xAuthCheck_1 = __importDefault(require("./xAuthCheck"));
exports.default = (type, req, credentials) => {
    switch (type) {
        case 'x-auth':
            if (credentials.xAuthorisationKey) {
                return xAuthCheck_1.default(req, credentials.xAuthorisationKey);
            }
            else {
                console.error('auth middleware use attempt with no xAuthorisationKey passed in the options! Returning false but this does not mean the auth check failed');
                return false;
            }
        case 'basic-auth':
            if (credentials.basicAuthUname && credentials.basicAuthPword) {
                return basicAuthCheck_1.default(req, credentials.basicAuthUname, credentials.basicAuthPword);
            }
            if (credentials.basicAuthArray) {
                let pass = false;
                credentials.basicAuthArray.forEach((basicAuth) => {
                    if (basicAuthCheck_1.default(req, basicAuth.basicAuthUname, basicAuth.basicAuthPword)) {
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
//# sourceMappingURL=validateSwitch.js.map