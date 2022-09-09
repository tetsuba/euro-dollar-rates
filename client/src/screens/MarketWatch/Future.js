import React from 'react'
import { getFuture } from '../../utils/service'
import { withRouter } from '../../HOC/withRouter'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import { convertFutureStringToObject } from './utils'
import LineChart from '../../components/Charts/LineChart'
import Checkbox from '../../components/Form/Checkbox'
import { mutateFutureList, mutateFutureListForLineChart } from '../../utils/mutations'

class Future extends React.Component {
    state = {
        future: {},
        showHideLineChart: false,
    }

    async componentDidMount() {
        const future = await getFuture(this.props.params.symbol)
        this.setState({
            future: future.data,
            futureList: mutateFutureList(future.data.list),
            futureYear: future.data.list.map(convertFutureStringToObject),
        })
    }

    handlerOnClickCheckbox = (e) => {
        const { futureList } = this.state
        const index = e.target.getAttribute('index')
        const checked = e.target.getAttribute('data-checked')
        futureList[index].checked = !(checked === 'true')
        this.setState({
            futureList
        })
    }

    handlerOnClickButton = () => {
        this.setState({
            showHideLineChart: !this.state.showHideLineChart
        })
    }

    renderCheckList() {
        return this.state.futureList.map(({ month, year, price, checked }, index) =>
          (<Checkbox
            key={`cb-${index}`}
            index={index}
            label={`${year}/${month} - ${price}`}
            checked={checked}
            onClick={this.handlerOnClickCheckbox}
          />))
    }

    render() {
        const { showHideLineChart, futureList } = this.state

        return (
            <>
                <BreadCrumbs />
                {
                    showHideLineChart &&
                    <>
                        <div className="row">
                            <button type="button" className="btn btn-primary" onClick={this.handlerOnClickButton}>Back</button>
                        </div>
                        <div className="row mt-5">
                            <LineChart data={mutateFutureListForLineChart(futureList)} />
                        </div>
                    </>
                }
                {
                    futureList && !showHideLineChart &&
                    <>
                        <div className="row">
                            <button type="button" className="btn btn-primary" onClick={this.handlerOnClickButton}>Create Chart</button>
                        </div>
                        <div className="row mt-5">
                            { this.renderCheckList() }
                        </div>

                    </>
                }
            </>
        )
    }
}

export default withRouter(Future)