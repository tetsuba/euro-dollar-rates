import React from 'react'
import { GET_FUTURES_LIST } from '../../utils/service'
import SearchBox from '../../components/SearchBox/SearchBox'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'
import withLoader from '../../HOC/withLoader'
import FuturesFullList from '../../components/List/FuturesFullList'
import FuturesGroupList from '../../components/List/FuturesGroupList.js'
import {
    mutateFuturesList,
    mutateFuturesListByGroupingNames,
} from '../../utils/mutations'

class Futures extends React.Component {
    state = {
        list: [],
        text: '',
    }

    async componentDidMount() {
        const list = mutateFuturesList(this.props.futures.list)
        this.setState({
            list,
            group: mutateFuturesListByGroupingNames(list),
        })
    }

    inputText = (ele) => {
        this.setState({
            text: ele.target.value.toUpperCase(),
        })
    }

    render() {
        return (
            <>
                <BreadCrumbs />
                <div className="row">
                    <div className="col">
                        <SearchBox
                            text={this.state.text}
                            label="Futures Symbol"
                            inputFunc={this.inputText}
                        />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <FuturesFullList
                            list={this.state.list}
                            text={this.state.text}
                        />
                    </div>
                    <div className="col">
                        <FuturesGroupList
                            list={this.state.group}
                            text={this.state.text}
                        />
                    </div>
                </div>
            </>
        )
    }
}

// TODO: Using an HOC to grab data from the server.
//       This is not very clear to follow.
//       Look into using hooks pattern to handle this request.
export default withLoader(Futures, GET_FUTURES_LIST)
