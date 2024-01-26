const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, vaildationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET= "Harryisagoodboy";
// ROUTE 1: Create a User using: POST  "/api/auth/createuser". Doesn't require Auth
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a vaild password').isLength({ min: 5 }),
], async (req, res) => {
  let success=false;
  //if there are errors, return Bad request and the errors
  const errors = vaildationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
      // Check whether the user with this email exists alreaady

    let user = User.findone({ email: req.body.email });
    if (user) {
      return res.status(400).json({ errors: "Sorry a user with this email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    //CRete a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.passsword
    })
    // }).then(user => res.json(user))
    // .catch(err=> {console.log(err)
    // res.json({error: 'Please enter a unique value for email', message: err.message})})
    const data={
    user:{
     id:user.id
    }
    }
    const authtoken=jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({success,authtoken});
    //catch a error
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
})
// ROUTE 2: Authenticate  a User using: POST  "/api/auth/createuser". Doesn't require Auth
router.post('/login', [
  // body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Pasword cannot be blank').exists(),
], async (req, res) => {
  let success =false;
  const errors = vaildationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    const {email, password} = req.body;
    try{
      let user= await User.findone(email);
      if(!user){
        success=false;
        return res.status(400).json({errors: "Please ttry to login with the correct creditiials" }); 
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        success=false;
        return res.status(400).json({success, errors: "Please try to login with the correct creditiials" }); 
    
      }
      const data={
        user:{
         id:user.id
        }
      }
      const authtoken=jwt.sign(data, JWT_SECRET);
      success =true;
      res.json({success,authtoken});
    }  catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  })

// ROUTE 3: Get loggedin  a user details using: POST  "/api/auth/getuser". Login Require
router.post('/getuser', fetchuser, async (req, res) => {

try{
   let userID = req.user.id;
  const user = await User.findById(userID).select("-password")
  res.send(user)
}catch(error){
  console.error(error.message);
      res.status(500).send("Internal server error");
}
})

module.exports = router
