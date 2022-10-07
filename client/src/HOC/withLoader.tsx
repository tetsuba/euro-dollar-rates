import React, { useState, useEffect } from 'react'
import Service from '../utils/service'
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner'

export default function withLoader(Component: any, funcName: any) {
    return (props: any) => {
        const [data, setData] = useState(null)

        useEffect(() => {
            Reflect.get(Service, funcName)().then((res: any) => setData(res.data))
        }, [])

        if (!data) return <LoadingSpinner />

        return <Component {...props} futures={data} />
    }
}
