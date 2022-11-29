import { postDataAPI } from '../../utils/fetchData'
import { APPTYPES } from './appTypes'
import valid from './valid'


export const TYPES = {
    AUTH: 'AUTH'
}
export const login = (data) => async (dispatch) => {
    try {

        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        const res = await postDataAPI('login', data)

        dispatch({
            type: 'AUTH',
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })
        localStorage.setItem("firstLogin", true)

        dispatch({
            type: 'NOTIFY',
            payload: {
                success: res.data.msg
            }
        })

    } catch (error) {
        dispatch({
            type: 'NOTIFY',
            payload: {
                error: error.response.data.msg
            }
        })
    }
}

export const register = (data) => async (dispatch) => {
    const check = valid(data);
        if(check.errLength > 0)
        return dispatch({type: APPTYPES.NOTIFY, payload: check.errMsg})

    try {
        dispatch({type: APPTYPES.NOTIFY, payload: {loading: true}})
        
        const res = await postDataAPI('register', data)
        dispatch({ 
            type: APPTYPES.AUTH, 
            payload: {
                token: res.data.access_token, 
                user: res.data.user
            } 
        })

        localStorage.setItem("firstLogin", true);
        dispatch({ 
            type: APPTYPES.NOTIFY, 
            payload: {
                success: res.data.msg
            } 
        })
    } catch (err) {
        dispatch({ 
            type: APPTYPES.NOTIFY, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}
export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin")
    if(firstLogin){
            try {
                const res = await postDataAPI('refresh_token')
                dispatch({ 
                    type: 'AUTH', 
                    payload: {
                        token: res.data.access_token, 
                        user: res.data.user
                    } 
                })

                dispatch({ type: 'NOTIFY', payload: {} })

            } catch (err) {
                dispatch({ 
                    type: 'NOTIFY', 
                    payload: {
                        error: err.response.data.msg
                    } 
                })
            }
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('firstLogin')
        await postDataAPI('logout')
        window.location.href = "/"
    } catch (err) {
        dispatch({ 
            type: APPTYPES.NOTIFY, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}