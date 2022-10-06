const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,

        unique: true
    },
    password: {
        type: String,
        required: true

    },
    avatar: {
        type: String,
        default: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fuser-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620%3Fk%3D20%26m%3D1300845620%26s%3D612x612%26w%3D0%26h%3Df4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Favatar-icons&tbnid=3ieVDLEJVcWu5M&vet=12ahUKEwinioOIosj6AhVG_5QKHY5RDQ8QMygHegUIARDSAQ..i&docid=MKyODsVhwt24HM&w=612&h=612&q=avatar%20icon&ved=2ahUKEwinioOIosj6AhVG_5QKHY5RDQ8QMygHegUIARDSAQ'

    },
    role: {
        type: String,
        default: 'user'

    },
    gender: { type: String, default: 'male' },
    mobile: { type: String, default: '' },
    address: { type: String, default: '' },
    story: {
        type: String, default: '',
        maxlength: 300
    },
    website: { type: String, default: '' },

    followers: [{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }],

    following: [{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }],

}, {
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)