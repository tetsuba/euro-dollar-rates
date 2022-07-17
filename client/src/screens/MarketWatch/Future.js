import React from 'react'
import { getFuture } from '../../utils/service'
import { withRouter } from '../../HOC/withRouter'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import { convertFutureStringToObject } from './utils'

class Future extends React.Component {

    state = {
        future: {}
    }

    async componentDidMount() {
        const future = await getFuture(this.props.params.symbol)

        this.setState({
            future: future.data,
            futureYear: future.data.list.map(convertFutureStringToObject)
        })
    }

    renderList() {
        return this.state.future.list.map(({name, price}) => (
          <div>
              <span>{name}</span>
          </div>))
    }

    render() {
        console.log(this.state)
        return (
          <>
              <BreadCrumbs />
              { this.state.future.list && this.renderList() }
          </>
        )
    }
}

export default withRouter(Future)