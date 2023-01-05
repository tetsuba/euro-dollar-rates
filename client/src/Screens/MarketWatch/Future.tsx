import React, {useState, useEffect} from 'react'
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import {fetchFuture} from '../../utils/service'

// COMPONENTS
import BreadCrumbs from '../../Components/BreadCrumbs/BreadCrumbs'
import LineChart from '../../Components/Charts/LineChart'
import FutureCheckBoxList from '../../Components/List/FutureCheckBoxList'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'

// UTILS
import {mutateFutureListForLineChart} from '../../utils/mutations'
import { EventClickType } from '../../utils/types'
import Error from "../Error";


export default function Future() {
    const [toggleChart, setToggleChart] = useState(false)
    const [list, setList] = useState([])
    const symbol = useParams()
    const {isLoading, data, isSuccess, isError} = useQuery(['future', symbol], fetchFuture)

    useEffect(() => {
        if(isSuccess){
            // @ts-ignore
            setList(data.list)
        }
    }, [data, isSuccess])

    if (isLoading) return (<LoadingSpinner />)
    if (isError) return <Error />

    return (
        <>
            <BreadCrumbs />
            <>
                <div className="row">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setToggleChart(!toggleChart)}
                    >
                        {toggleChart ? 'Back' : 'Create Chart'}
                    </button>
                </div>
                {
                    !toggleChart && (
                        <div className="row mt-5" data-testid="future-checkbox-list">
                            <FutureCheckBoxList
                                list={list}
                                onClick={
                                    (e: EventClickType): void => {
                                        const el = e.target as HTMLElement
                                        const index: null | string = el.getAttribute('data-index')
                                        const checked: null | string = el.getAttribute('data-checked')

                                        // TODO: Look into this and find out why TS is producing this error
                                        // TS2339: Property 'checked' does not exist on type 'never'.
                                        // @ts-ignore
                                        list[Number(index)].checked = !(checked === 'true')
                                        // Return a new array to update components
                                        setList([...list])
                                    }
                                }
                            />
                        </div>
                    )
                }
                {
                    toggleChart && (<div className="row mt-5"><LineChart {...mutateFutureListForLineChart(list)} /></div>)
                }
            </>
        </>
    )
}
