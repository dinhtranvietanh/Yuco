import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { CHAT_TYPES } from './redux/actions/chatAction'

const SocketClient = () => {
    const {auth, socketReducer} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        socketReducer.emit('johnUser', auth.user._id)
    }, [socketReducer, auth.user._id])
    
    //Chat
    useEffect(() => {
      socketReducer.on('createChatToClient', message => {
        // console.log(message)
          dispatch({
            type: CHAT_TYPES.CREATE_CHAT,
            payload: message
          })
      })
          return() => socketReducer.off('createChatToClient')
  }, [socketReducer, dispatch])

  return <></>
  
}

export default SocketClient