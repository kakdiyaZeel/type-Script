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
exports.signIn = exports.signUp = void 0;
const auth_service_1 = require("../services/auth-service");
const common_1 = require("../common");
const md5_1 = __importDefault(require("md5"));
const auth_1 = require("../auth");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { phoneNumber, email, password, role } = req.body;
        const salt = (0, md5_1.default)(10);
        password = (0, md5_1.default)(password, salt);
        let createUsers = yield (0, auth_service_1.createUser)(phoneNumber, email, password)
            .then((user) => {
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
        })
            .catch((err) => {
            return common_1.response.errorResponse(res, 500, err.message, err);
        });
    }
    catch (error) {
        console.log(error);
        return common_1.response.errorResponse(res, 500, error.message, error);
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, phoneNumber, password } = req.body;
        const body = phoneNumber;
        const salt = (0, md5_1.default)(10);
        const encryptedPassword = (0, md5_1.default)(password, salt);
        const authorities = [];
        const data = body
            ? yield (0, auth_service_1.loginWithPhone)(phoneNumber, encryptedPassword)
            : yield (0, auth_service_1.loginWithEmail)(email, encryptedPassword);
        const roles = yield (data === null || data === void 0 ? void 0 : data.getRoles());
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        if (!data) {
            (err) => {
                return common_1.response.errorResponse(res, 401, "Credential Error", err);
            };
        }
        const authToken = (0, auth_1.token)(data === null || data === void 0 ? void 0 : data.id, data === null || data === void 0 ? void 0 : data.email, data === null || data === void 0 ? void 0 : data.phoneNumber);
        return common_1.response.successResponse(res, "Login Successfully", {
            data,
            role: authorities,
            token: (yield authToken).toString(),
        });
    }
    catch (error) {
        return common_1.response.errorResponse(res, 500, error.message, error);
    }
});
exports.signIn = signIn;
