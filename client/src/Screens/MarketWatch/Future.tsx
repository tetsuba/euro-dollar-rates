import React from 'react'
import service from '../../utils/service'

// HOC
import { withRouter } from '../../HOC/withRouter'

// COMPONENTS
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'
import LineChart from '../../Components/Charts/LineChart'
import FutureCheckBoxList from '../../Components/List/FutureCheckBoxList'

// UTILS
import {
    mutateFutureList,
    mutateFutureListForLineChart,
    mutateFutureStringToObject,
} from '../../utils/mutations'
import { EventClickType, FutureListType, FutureType } from '../../utils/types'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'

interface PropTypes {
    params: {
        [key: string]: string
    }
}


interface StateTypes {
    future: {
        data: {
            list: FutureType[]
        }
    }
    futureList: FutureType[]
    futureYear: FutureListType[]
    showHideLineChart: boolean
}


class Future extends React.Component<PropTypes, StateTypes> {
    state = {
        future: {
            data: {
                list: [],
            },
        },
        futureList: [],
        futureYear: [],
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

    handlerOnClickCheckbox = (e: EventClickType): void => {
        const { futureList } = this.state
        const el = e.target as HTMLElement
        const index: null | string = el.getAttribute('data-index')
        const checked: null | string = el.getAttribute('data-checked')

        // TODO: Look into this and find out why TS is producing this error
        // TS2339: Property 'checked' does not exist on type 'never'.
        // @ts-ignore
        futureList[Number(index)].checked = !(checked === 'true')
        // futureList[Number(index)].checked = !(checked === 'true')
        this.setState({ futureList })
    }

    handlerOnClickButton = () => {
        this.setState({
            showHideLineChart: !this.state.showHideLineChart,
        })
    }

    renderChart(futureList: FutureType[]) {
        return (
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
                    <LineChart {...mutateFutureListForLineChart(futureList)} />
                </div>
            </>
        )
    }

    renderList(futureList: FutureType[]) {
        return (
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
        )
    }

    render() {
        const { showHideLineChart, futureList } = this.state

        return (
            <>
                <BreadCrumbs />
                {futureList.length < 1 ? (
                    <LoadingSpinner />
                ) : showHideLineChart ? (
                    this.renderChart(futureList)
                ) : (
                    this.renderList(futureList)
                )}
            </>
        )
    }
}

export default withRouter(Future)
