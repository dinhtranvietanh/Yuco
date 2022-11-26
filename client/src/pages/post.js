import { Layout } from 'antd'
import React, { useEffect } from 'react'
import StatusForm from './post-page/form-post/status-form'
import { getDataAPI } from '../utils/fetchData'
import StatusItem from './post-page/posts/status'
import Posts from './post-page/posts'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../redux/actions/postAction'

export const Post = () => {

    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPosts(auth))
    },[])
    
    return(
        <Layout
        style={{padding: 20}}
        >
            <StatusForm/>
            <Posts/>
        </Layout>
    )
}