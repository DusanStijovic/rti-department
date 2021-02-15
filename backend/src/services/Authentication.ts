import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { connect, Document, Schema } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as fs from "fs"
import { User } from '../model/User';


const expressJwt = require('express-jwt');
const RSA_PUBLIC_KEY = fs.readFileSync('src/demos/public.key');



const RSA_PRIVATE_KEY = fs.readFileSync('src/demos/private.key');

function getSecurityToken(user: Document<any>) {
    const token = jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        subject: JSON.stringify(user)
    })
    return token
}
const checkIfAuthenticated =
    expressJwt({
        secret: RSA_PUBLIC_KEY,
        algorithms: ['RS256']
    });


export { getSecurityToken, checkIfAuthenticated }

