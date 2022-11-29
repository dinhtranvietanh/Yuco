const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

const authCtrl = {
  searchUser: async (req, res) => {
    try {
        const users = await Users.find({email: {$regex: req.query.username}})
        .select("email fullname username avatar")
        
        res.json({users})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
  register: async (req, res) => {
    try {
      const {email, password } = req.body;

      console.log(req.body)
      const user_email = await Users.findOne({ email });
      if (user_email)
        return res.status(400).json({ msg: "the email is already exist" });

      if (password.length < 6)
        return res.status(400).json({ msg: "password is too short" });
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        fullname: '',
        username: '',
        email,
        password: passwordHash,
        gender: '',
      });

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      await newUser.save();

      res.json({
        msg: "registed",
        access_token,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email })

      if (!user) return res.status(400).json({ msg: "email does not exist" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "wrong password" });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
        msg: "login successful",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });

      return res.json({ msg: "Log out" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token) return res.status(400).json({ msg: "Must login" });
      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (error, result) => {
          if (error) return res.status(400).json({ msg: "Must login" });
          console.log(result);
          const user = await Users.findById(result.id)
            .select("-password")

          if (!user)
            return res.status(400).json({ msg: "This does not exist" });

          const access_token = createAccessToken({ id: result.id });
          res.json({
            access_token,
            user,
          });
        }
      );
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  forgetPassword: async (req, res) => {
    try {


        const {email} = req.body
    const user = await Users.findOne({email})
    if(!user) res.send({message:"email does not exist"})
    const access_token = createAccessToken({id: user._id})
    const url = `${CLIENT_URL}/api/reset/${access_token}`

      sendMail(email, url, "new password")

      res.send({msg: "check email!"})
    } catch (error) {
       res.send({message: err.message})
    }
  },

resetPassword: async (req, res) => {
    try {
      const {password} = req.body
      console.log(password)

      const passwordHash = await bcrypt.hash(password, 12)

      await Users.findOneAndUpdate({_id: req.user.id}, {
          password: passwordHash
      })

      res.send({message: "Password changed!"})
    } catch (error) {
       res.send({message: err.message})
    }
  },

  getAuthUser: async (req, res , next) => {
    try {
      const auth_data = await Users.findById(req.params.id).select('-password')    
      if(!auth_data) throw new Error(`User had not existed !`)  

      res.send({auth_data})
    } catch (error) {
      next(error)
    }
  }
};

module.exports = authCtrl;
