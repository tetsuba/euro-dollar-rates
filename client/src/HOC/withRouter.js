import { useParams } from 'react-router-dom'

export function withRouter(WrappedComponent) {
    return function (props) {
        const params = useParams()
        return <WrappedComponent {...props} params={params} />
    }
}
