/*
    Authentication Paths / Auth
    host + /api/auth
*/

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { createUser, loginUser, renewToken } = require('../controllers/auth');
const validate = require('../middleware/field-validator');
const { validateJWT } = require('../middleware/validated-token');

router.post(
    '/new',
    [
        check('name')
            .isLength({ min: 3 })
            .withMessage('Must be at least 3 chars long')
        ,
        check('password')
            .isLength({ min: 5 })
            .withMessage('Must be at least 5 chars long')
            .matches(/\d/)
            .withMessage('Must contain a number')
        ,
        check('email')
            .isEmail()
            .withMessage('Email is Invalid')
    ],
    validate,
    createUser
)

router.post(
    '/',
    [
        check('email')
            .isEmail()
            .withMessage('Email is Invalid')
        ,
        check('password')
            .isLength({ min: 5 })
            .withMessage('Must be at least 5 chars long')
            .matches(/\d/)
            .withMessage('Must contain a number')
    ],
    validate,
    loginUser
)

router.get(
    '/renew',
    validateJWT,
    renewToken
)

module.exports = router;