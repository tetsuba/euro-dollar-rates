import React, {useState} from 'react'
import {fetchFutures} from '../../utils/service'
import SearchBox from '../../Components/SearchBox/SearchBox'
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'
import FuturesFullList from '../../Components/List/FuturesFullList'
import FuturesGroupList from '../../Components/List/FuturesGroupList'
import { InputElementType } from '../../utils/types'
import {useQuery} from "react-query";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner"
import {filterFuturesList} from "../../utils/mutations"
import Error from "../Error"

const Futures = () => {
    const futures = useQuery(['futures'], fetchFutures)
    const [text, setText] = useState('')

    if (futures.isLoading) return <LoadingSpinner />
    if (futures.isError) return <Error />

    // TODO: is this the right way?
    const list = futures.data?.list || []
    const group = futures.data?.group || []

    return (
        <>
            <BreadCrumbs />
            <div className="row">
                <div className="col">
                    <SearchBox
                        text={text}
                        label="Futures Symbol"
                        inputFunc={(e: InputElementType) => setText(e.target.value.toUpperCase())}
                    />
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <FuturesFullList
                        list={filterFuturesList(list, text)}
                        text={text}
                    />
                </div>
                <div className="col">
                    <FuturesGroupList
                        list={filterFuturesList(group, text)}
                        text={text}
                    />
                </div>
            </div>
        </>
    )
}

export default Futures
