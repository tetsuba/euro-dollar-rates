import React from 'react'
import { GET_FUTURES_LIST } from '../../utils/service'
import SearchBox from '../../Components/SearchBox/SearchBox'
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'
import FuturesFullList from '../../Components/List/FuturesFullList'
import FuturesGroupList from '../../Components/List/FuturesGroupList'
import withLoader from '../../HOC/withLoader'
import {
    mutateFuturesList,
    mutateFuturesListByGroupingNames,
} from '../../utils/mutations'
import { FuturesType, InputElementType } from '../../utils/types'

interface PropTypes {
    futures: FuturesType
}

interface StateTypes {
    list: string[]
    group: string[]
    text: string
}

class Futures extends React.Component<PropTypes, StateTypes> {
    state = {
        list: [],
        group: [],
        text: '',
    }

    async componentDidMount() {
        const list = mutateFuturesList(this.props.futures.list)
        this.setState({
            list,
            group: mutateFuturesListByGroupingNames(list),
        })
    }

    inputText = (e: InputElementType) => {
        this.setState({
            text: e.target.value.toUpperCase(),
        })
    }

    filterList(list: string[], text: string) {
        return list.filter((name: string) => name.startsWith(text))
    }

    render() {
        const { text, list, group } = this.state

        return (
            <>
                <BreadCrumbs />
                <div className="row">
                    <div className="col">
                        <SearchBox
                            text={text}
                            label="Futures Symbol"
                            inputFunc={this.inputText}
                        />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <FuturesFullList
                            list={this.filterList(list, text)}
                            text={text}
                        />
                    </div>
                    <div className="col">
                        <FuturesGroupList
                            list={this.filterList(group, text)}
                            text={text}
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
