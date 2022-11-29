import React from 'react'
import { MessageOutlined } from '@ant-design/icons'
import SearchUser from './chat/searchUser'

const Chat = () => {
  return (
        <div className="chat d-flex">
            <div className="col-md-3 border-right px-0">

                <SearchUser />

            </div>

            <div className="col-md-8 px-0">
                <div className="d-flex align-items-center justify-content-center h-100">
                    <h2 className='mr-2'>Nothing here </h2>
                    <MessageOutlined type='solid' style={{fontSize: '30px'}} name='chat'/>
                </div>
            </div>
        </div>
  )
}

export default Chat