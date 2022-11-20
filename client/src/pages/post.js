import { Layout } from 'antd'
import React from 'react'
import StatusForm from './post-page/form-post/status-form'

export const Post = () => {
    return(
        <Layout
        style={{padding: 20}}
        >
            <StatusForm/>
        </Layout>
    )
}