import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { connect } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as fs from "fs"
import { User } from '../model/User';
import authentification = require('../services/Authentication')
import UserService from '../services/UserService'



mongoose.connect('mongodb://localhost:27017/RTI_Katedra');
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('mongo connected');
})


function checkUserNamePattern(userName: string): boolean {
    let regExpStudent: RegExp = /^[a-z]{2}[0-9]{6}[dmp]@student\.etf\.rs$/;
    let check = regExpStudent.test(userName);
    let regExprEmployee = /^[a-z][a-z_]*@etf\.bg\.ac\.rs$/;
    let check2 = regExprEmployee.test(userName);
    let regAdmin = /^admin@admin$/;
    let check3 = regAdmin.test(userName);
    console.log("provera" + userName);
    return check || check2 || check3;
}

function login(request: any, response: any) {
    const username = request.body.username, password = request.body.password;
    console.log("SSS" + password);
    if (!checkUserNamePattern(username)) {
        response.status(510).json({
            errorMessage: 'Korisnicko ime nije u dobrom formatu'
        });
    } else {
        UserService.getUser(username, password).then((user: any) => {
            console.log("UALZM OVDE"); console.log(user);
            if (user) {
                const token = authentification.getSecurityToken(user);
                response.status(200).json({
                    idToken: token,
                    user: user
                })
            } else {
                response.status(510).json({
                    errorMessage: 'Korisnicko ime ili lozinka nisu ispravni'
                });
            }
        });
    }
}

export { login }