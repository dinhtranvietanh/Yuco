

const valid = ({ email, password, confirmpassword}) => {
    const err = {}


    if(!email) {
        err.email = "Email là bắt buộc !"
    }else if(!validateEmail(email)) {
        err.email = "Email định dạng không chính xác"
    }

    if(!password) {
        err.password = "Mật khẩu là bắt buộc !"
    }else if(password.length < 6) {
        err.password = "Mật khẩu phải có ít nhất 6 kí tự"
    }

    if(confirmpassword !== password) {
        err.confirmpassword = "Xác nhận mật khẩu chưa chính xác !"
    }
    return{
        errMsg: err,
        errLength: Object.keys(err).length
    }
}

function validateEmail(email) {
    //eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default valid