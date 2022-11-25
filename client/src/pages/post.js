import { Layout } from 'antd'
import React from 'react'
import StatusForm from './post-page/form-post/status-form'
import { getDataAPI } from '../utils/fetchData'
import StatusItem from './post-page/posts/status'

export const Post = () => {

    
    return(
        <Layout
        style={{padding: 20}}
        >
            <StatusForm/>
        </Layout>
    )
}