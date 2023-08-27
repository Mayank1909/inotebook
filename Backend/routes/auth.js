const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
// agar mujhe req.body ko use karna hai to mujhe middleware ko laga padega 
// Create a User using : POST "/api/auth/createuser". doesnt require auth
const JWT_SECRET = "shhh"

// Route 1:
router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must of minimum 5 letters ").isLength({ min: 5 }),
], async (req, res) => {
    // if their are error return bad request  and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // chefck wheather the user exist already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "sorry user with this email id aready exists." })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        const data = {
            id: user.id
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken)
        res.json({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal servers Error")
    }
})

// ROUTE 2:
// authenticate a user  suign post "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid name').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    // if their are error return bad request  and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with the coresct credentials" });
        }
        // bcrypt compare is an asynchronous function so we have to do await 
        const passwordComapre = await bcrypt.compare(password, user.password);
        if (!passwordComapre) {
            return res.status(400).json({ error: "Please try to login with the coresct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal servers Error ")
    }

})
//  Route 3: get loggin user Detail using : POST " api/suth/getuser". login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;  // yahan pe hum use kar rahe hai fethuserid.js se jo humne wahan banaya hai 
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal servers Error ")
    }
})
module.exports = router