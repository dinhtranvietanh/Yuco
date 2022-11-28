import { LikeFilled } from '@ant-design/icons'
import React from 'react'

const ButtonLike = ({like, handleUnLike, handleLike}) => {
    console.log(like)
  return (
    <>
            {
              like ? <LikeFilled onClick={handleUnLike} style={{fontSize: 30, color: 'red'}}/> : <LikeFilled onClick={handleLike} style={{fontSize: 30}}/>
            }
    </>
  )
}

export default ButtonLike