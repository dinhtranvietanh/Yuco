

const valid = ({fullname, username, email, password, confirmpassword}) => {
    const err = {}

    if(!fullname) {
        err.fullname = "Fullname is required"
    }else if(fullname.length > 30) {
        err.fullname = "Fullname must be not over 30 chars"
    }

    if(!username) {
        err.username = "username is required!"
    }else if(username.replace(/ /g, "").length > 15) {
        err.username = "username must be not over 15 chars"
    }

    if(!email) {
        err.email = "Email is required !"
    }else if(!validateEmail(email)) {
        err.email = "validated email"
    }

    if(!password) {
        err.password = "password is required !"
    }else if(password.length < 6) {
        err.password = "password must be at least 6 chars"
    }

    if(confirmpassword !== password) {
        err.confirmpassword = "password is not correct!"
    }
    return{
        errMsg: err,
        errLength: Object.keys(err).length
    }
}



export default valid
