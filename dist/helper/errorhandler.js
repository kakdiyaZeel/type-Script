"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlErrorHandler = void 0;
const sqlErrorHandler = (code) => {
    var errMsg = "";
    switch (code) {
        case "jwt must be provided":
            errMsg = "Recent sign in required!";
            break;
    }
    return errMsg;
};
exports.sqlErrorHandler = sqlErrorHandler;
