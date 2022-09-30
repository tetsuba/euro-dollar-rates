import { useState, useEffect } from 'react'
import Service from '../utils/service'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'

export default function withLoader(Component, funcName) {
  return (props) => {
    const [data, setData] = useState(null)

    useEffect(() => {
      Reflect.get(Service, funcName)()
        .then((res) => setData(res.data))
    }, [])

    if(!data) return <LoadingSpinner />

    return <Component {...props} futures={data} />
  }
}
