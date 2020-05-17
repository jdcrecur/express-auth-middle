"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateSwitch_1 = __importDefault(require("./validateSwitch"));
/**
 * Express middleware to validate requests for basic and/or xAuth
 * @returns {Function}
 */
exports.default = (options) => {
    return (req, res, next) => {
        if (typeof options.methods === 'undefined' || typeof options.credentials === 'undefined') {
            console.error('No authentication methods defined in the provided options. Will return a default 401.');
            return return401(res, options);
        }
        if (typeof options.methods === 'string') {
            if (validateSwitch_1.default(options.methods, req, options.credentials)) {
                return next();
            }
            return return401(res, options);
        }
        if (Array.isArray(options.methods)) {
            for (let i = 0; i < options.methods.length; ++i) {
                if (validateSwitch_1.default(options.methods[i], req, options.credentials)) {
                    return next();
                }
            }
        }
        // If we have reached this far, then 401
        return return401(res, options);
    };
};
//# sourceMappingURL=index.js.map