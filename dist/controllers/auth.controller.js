"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.resetPassword = exports.forgotPassword = exports.changePassword = exports.signIn = exports.signUp = void 0;
const models_1 = require("../models");
const auth_service_1 = require("../services/auth-service");
const common_1 = require("../common");
const md5_1 = __importDefault(require("md5"));
const auth_1 = require("../auth");
const send_email_utils_1 = require("../utils/send-email.utils");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { phoneNumber, email, password, role } = req.body;
        const salt = (0, md5_1.default)(10);
        password = (0, md5_1.default)(password, salt);
        let createUsers = yield (0, auth_service_1.createUser)(phoneNumber, email, password).then((user) => {
            if (role) {
                (0, auth_service_1.findRole)(role).then((roles) => {
                    user === null || user === void 0 ? void 0 : user.setRoles(roles).then(() => {
                        return common_1.response.successResponse(res, "User Sign In Successfully", createUsers);
                    });
                });
            }
            else {
                user === null || user === void 0 ? void 0 : user.setRoles([1]).then(() => {
                    return common_1.response.successResponse(res, "User Sign In Successfully", createUsers);
                });
            }
        });
    }
    catch (error) {
        console.log(error.message);
        if (error.message === "SequelizeUniqueConstraintError: Validation error") {
            return common_1.response.errorResponse(res, 401, "Please Enter Your Valid EmailId And PhoneNumber");
        }
        return common_1.response.errorResponse(res, 500, "validation error", error.message);
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, phoneNumber, password } = req.body;
        const body = phoneNumber;
        const validator = true;
        const salt = (0, md5_1.default)(10);
        const encryptedPassword = (0, md5_1.default)(password, salt);
        const authorities = [];
        const data = body
            ? yield (0, auth_service_1.loginWithPhone)(phoneNumber, encryptedPassword)
            : yield (0, auth_service_1.loginWithEmail)(email, encryptedPassword);
        const filterEmail = (data === null || data === void 0 ? void 0 : data.email) == email;
        const filterPassword = (data === null || data === void 0 ? void 0 : data.password) == encryptedPassword;
        const validation = validator ? filterEmail : filterPassword;
        if (validation == false) {
            return common_1.response.errorResponse(res, 403, "Please Check Your Credentials");
        }
        const roles = yield (data === null || data === void 0 ? void 0 : data.getRoles());
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        if (!data) {
            return common_1.response.errorResponse(res, 401, "Credential Error");
        }
        const authToken = (0, auth_1.token)(data === null || data === void 0 ? void 0 : data.id, data === null || data === void 0 ? void 0 : data.email, data === null || data === void 0 ? void 0 : data.phoneNumber);
        res.cookie("TPG", (yield authToken).toString(), {
            httpOnly: true,
            maxAge: 900000,
        });
        return common_1.response.successResponse(res, "Login Successfully", {
            role: authorities,
            token: (yield authToken).toString(),
        });
    }
    catch (error) {
        return common_1.response.errorResponse(res, 500, error.message, error);
    }
});
exports.signIn = signIn;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { password, confirmPassword } = req.body;
        const { id } = req.token;
        const salt = (0, md5_1.default)(10);
        password = (0, md5_1.default)(password, salt);
        confirmPassword = (0, md5_1.default)(confirmPassword, salt);
        if (confirmPassword !== password) {
            return common_1.response.errorResponse(res, 401, "Password Not Matched", "err");
        }
        const changePassword = yield (0, auth_service_1.changeUserPassword)(password, id);
        if (!changePassword) {
            return common_1.response.errorResponse(res, 401, "Please Try-Again Password Not Changed");
        }
        return common_1.response.successResponse(res, "Password Changed Successful, You Can Now Login With The New Password");
    }
    catch (error) {
        return common_1.response.errorResponse(res, 500, error.message, error);
    }
});
exports.changePassword = changePassword;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email } = req.body;
        const resetToken = req.headers["authorization"];
        const origin = (_a = req.header("Origin")) === null || _a === void 0 ? void 0 : _a.toString();
        console.log("origin", origin);
        const user = yield models_1.User.findOne({ where: { email: email } });
        if (!user) {
            return common_1.response.successResponse(res, "Response Ok", "List User");
        }
        yield (0, send_email_utils_1.sendPasswordResetEmail)(email, resetToken, origin);
        return common_1.response.successResponse(res, "Please check your email for a new password");
    }
    catch (error) {
        return common_1.response.errorResponse(res, 500, error.message, error);
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { passWord } = req.body;
    const name = "Reset - Password Template";
    return res.render("reset", {
        Password: passWord,
    });
});
exports.resetPassword = resetPassword;
const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("TPG");
        return common_1.response.successResponse(res, "You Have Been Singed-Out");
    }
    catch (error) {
        return common_1.response.errorResponse(res, error.message, error);
    }
});
exports.signOut = signOut;
