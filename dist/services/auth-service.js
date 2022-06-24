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
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserPassword = exports.loginWithEmail = exports.loginWithPhone = exports.findRole = exports.createUser = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const createUser = (phoneNumber, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let createUser = yield models_1.User.create({
            phoneNumber: phoneNumber,
            email: email,
            password: password,
        });
        return createUser;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createUser = createUser;
const findRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const findRole = yield models_1.Role.findAll({ where: { name: { [sequelize_1.Op.or]: role } } });
    return findRole;
});
exports.findRole = findRole;
const loginWithPhone = (phoneNumber, encryptedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginUser = yield models_1.User.findOne({
            where: {
                phoneNumber: phoneNumber,
                password: encryptedPassword,
            },
        });
        return loginUser;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.loginWithPhone = loginWithPhone;
const loginWithEmail = (email, encryptedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginUser = yield models_1.User.findOne({
            where: {
                email: email,
                password: encryptedPassword,
            },
        });
        return loginUser;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.loginWithEmail = loginWithEmail;
const changeUserPassword = (password, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatePassword = yield models_1.User.update({ password: password }, {
            where: { id: id },
        });
        return updatePassword;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.changeUserPassword = changeUserPassword;
