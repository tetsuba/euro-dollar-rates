import React from 'react'
import service from '../../utils/service'
import { withRouter } from '../../HOC/withRouter'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import LineChart from '../../components/Charts/LineChart'
import {
    mutateFutureList,
    mutateFutureListForLineChart,
    mutateFutureStringToObject,
} from '../../utils/mutations'
import FutureCheckBoxList from '../../components/List/FutureCheckBoxList';

class Future extends React.Component {
    state = {
        future: {},
        showHideLineChart: false,
    }

    async componentDidMount() {
        const future = await service.getFuture(this.props.params.symbol)

        this.setState({
            future: future.data,
            futureList: mutateFutureList(future.data.list),
            futureYear: future.data.list.map(mutateFutureStringToObject),
        })
    }

    handlerOnClickCheckbox = (e) => {
        const { futureList } = this.state
        const index = e.target.getAttribute('index')
        const checked = e.target.getAttribute('data-checked')
        futureList[index].checked = !(checked === 'true')
        this.setState({
            futureList,
        })
    }

    handlerOnClickButton = () => {
        this.setState({
            showHideLineChart: !this.state.showHideLineChart,
        })
    }

    render() {
        const { showHideLineChart, futureList } = this.state

        return (
            <>
                <BreadCrumbs />
                {showHideLineChart && (
                    <>
                        <div className="row">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.handlerOnClickButton}
                            >
                                Back
                            </button>
                        </div>
                        <div className="row mt-5">
                            <LineChart
                                data={mutateFutureListForLineChart(futureList)}
                            />
                        </div>
                    </>
                )}
                {futureList && !showHideLineChart && (
                    <>
                        <div className="row">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.handlerOnClickButton}
                            >
                                Create Chart
                            </button>
                        </div>
                        <div className="row mt-5" data-testid="future-checkbox-list">
                            <FutureCheckBoxList
                              list={futureList}
                              onClick={this.handlerOnClickCheckbox}
                            />
                        </div>
                    </>
                )}
            </>
        )
    }
}

export default withRouter(Future)
