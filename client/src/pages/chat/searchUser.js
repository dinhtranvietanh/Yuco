import { SearchOutlined } from '@ant-design/icons'
import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { APPTYPES } from '../../redux/actions/appTypes'
import { getInfoUser, getUserConversation } from '../../redux/actions/chatAction'
import { getDataAPI } from '../../utils/fetchData'
import DisplayUser from './displayUser'


const SearchUser = () => {
  const [searchUser, setSearchUser] = useState('')
  const [users, setUsers] = useState([])

  const {auth, chatReducer} = useSelector(state => state)
  const dispatch = useDispatch()

  const history = useNavigate()

  const handleSearch = async (e) => {
      e.preventDefault()
      if(!searchUser) 
      return setUsers([]);
        try {
          const res =  await getDataAPI(`search_user?username=${searchUser}`, auth.token)
          setUsers(res.data.users)

        } catch (err) {
        dispatch({
          type: APPTYPES.NOTIFY, 
          payload: {
            error: err.response.data.msg
          }
        })
      }
  }

  const handleGetInfoUser = (user) => {
      setSearchUser('')
      setUsers([])
      dispatch(getInfoUser({user, chatReducer}))
      return history(`/chat/${user._id}`)
  }

  useEffect(() => {
      dispatch(getUserConversation({auth}))
  }, [dispatch, auth])

  return (
      <>
        <div className="chat_search">
          <form onClick={handleSearch} >

              <input type="text" value={searchUser}
              onChange={event => setSearchUser(event.target.value)}
              placeholder="Search on chat" />

              <button>
                <SearchOutlined style={{fontSize: 24}}/>
              </button>

          </form>
        </div>

        <div className="chat_user_list">
            { 
                users.length !== 0
                ? 
                  <>
                    {
                      users.map(user => (
                          <div key={user._id} onClick={() => handleGetInfoUser(user)}>
                            <DisplayUser user={user}/>
                          </div>
                      ))
                    }
                  </>
                : 
                  <>
                    {
                      chatReducer.users.map(user => (
                          <div key={user._id} onClick={() => handleGetInfoUser(user)}>
                            <DisplayUser user={user}/>
                          </div>
                      ))
                    }
                  </>
            }
          </div>
      </>
  )
}

export default SearchUser