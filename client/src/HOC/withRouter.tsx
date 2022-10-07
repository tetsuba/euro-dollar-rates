import React from 'react'
import { useParams } from 'react-router-dom'

export function withRouter(WrappedComponent: any) {
    return function (props: any) {
        const params = useParams()
        return <WrappedComponent {...props} params={params} />
    }
}
