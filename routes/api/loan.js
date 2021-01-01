const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { findOneAndUpdate } = require("../../models/User");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

router.put('/addloan',auth,[
    check("email", "Please provide valid email").isEmail()
    ], async (req,res)=>{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

    const { name,address,contactno,email,loanamt,startdate,enddate,installments } = req.body;

    const newLoan = {
        name,address,contactno,email,loanamt,startdate,enddate,installments
    }

    try {
        const profile = await User.findById({ _id: req.user.id });
        profile.loan.unshift(newLoan);
        await profile.save();
        res.json(profile);

      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }

    // res.send("Adding Loan");
})

router.get('/viewloans',auth, async (req,res)=>{
    // const {id }= req.body;
    try {
        const profile = await User.findById({_id:req.user.id}).select("-password");
        res.json(profile.loan);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;