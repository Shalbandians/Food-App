const express = require("express")
const router = express.Router()

const User = require("../models/User")
const { body, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
const jwtSceret = "mynameisendtoendbuobjkb#gg"
const bcrypt = require("bcryptjs")

router.post("/createuser",
    body('email').isEmail(),
    body('password', "incorrect password").isLength({ min: 5 }),


    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let setPassword = await bcrypt.hash(req.body.password, salt)
        try {
            await User.create({
                name: req.body.name,
                password: setPassword,
                email: req.body.email,
                location: req.body.location
            })

            res.json({ success: true });

        } catch (error) {
            console.log(error)
            res.json({ success: false });

        }
    })

router.post("/loginuser", [
    // username must be an email
    body('email', "Incorrect Email").isEmail(),
    // password must be at least 5 chars long
    body('password', "Incorrect Password").isLength({ min: 5 })],


    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email
        try {
            const userData = await User.findOne({ email })
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct  credentials" });

            }
            const jwtCompare = await bcrypt.compare(req.body.password, userData.password)
            if (!jwtCompare) {
                return res.status(400).json({ errors: "Try logging with correct  credentials" });

            }

            else {
                const data = {
                    user: {
                        id: userData.id
                    }
                }
                const authToken = jwt.sign(data, jwtSceret)
                res.json({ success: true, authToken: authToken });
            }

        } catch (error) {
            console.log(error)
            res.json({ success: false });

        }

    })

module.exports = router;